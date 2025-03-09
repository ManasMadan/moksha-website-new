'use server';

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {connectToDB as connectDB} from "@/lib/mongoose";
import Event from "@/lib/models/Event";
import EventRegistration from "@/lib/models/EventRegistration";
import { uploadFile } from "@/lib/s3";
import mongoose from "mongoose";

export async function registerForEvent(formData: FormData) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { success: false, error: "Authentication required" };
    }
    
    const userId = session.user.id;
    const eventId = formData.get("eventId") as string;
    
    if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
      return { success: false, error: "Invalid event ID" };
    }
  
    const event = await Event.findById(eventId);
    
    if (!event) {
      return { success: false, error: "Event not found" };
    }
    
    if (!event.acceptingRegistrations) {
      return { success: false, error: "Registration for this event is closed" };
    }
    
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userId
    });
    
    if (existingRegistration) {
      return { success: false, error: "You are already registered for this event" };
    }
    
    const teamMembersCount = parseInt(formData.get("teamMembersCount") as string);
    const teamMembers = [];
    
    for (let i = 0; i < teamMembersCount; i++) {
      teamMembers.push({
        name: formData.get(`teamMember[${i}].name`) as string,
        age: formData.get(`teamMember[${i}].age`) as string,
        college: formData.get(`teamMember[${i}].college`) as string,
        email: formData.get(`teamMember[${i}].email`) as string,
        phone: formData.get(`teamMember[${i}].phone`) as string,
        yearOfPassing: formData.get(`teamMember[${i}].yearOfPassing`) as string,
      });
    }
    
    if (event.isTeamEvent) {
      if (teamMembers.length < event.minNumberOfTeamMembers) {
        return { 
          success: false, 
          error: `Minimum ${event.minNumberOfTeamMembers} team members required` 
        };
      }
      
      if (teamMembers.length > event.maxNumberOfTeamMembers) {
        return { 
          success: false, 
          error: `Maximum ${event.maxNumberOfTeamMembers} team members allowed` 
        };
      }
    }
    
    const customInputValues = [];
    
    if (event.customInputs && event.customInputs.length > 0) {
      for (const input of event.customInputs) {
        const inputId = input._id.toString();
        
        if (input.type === "file") {
          const file = formData.get(inputId) as File;
          
          if (input.required && (!file || file.size === 0)) {
            return { success: false, error: `${input.label} is required` };
          }
          
          if (file && file.size > 0) {
            if (input.maxSize && file.size > input.maxSize * 1024 * 1024) {
              return { 
                success: false, 
                error: `${input.label} exceeds maximum size of ${input.maxSize}MB` 
              };
            }
            
            const fileUrl = await uploadFile(file, `${eventId}/${userId}`);
            
            customInputValues.push({
              inputId: new mongoose.Types.ObjectId(inputId),
              value: file.name,
              fileUrl
            });
          }
        } else {
          const value = formData.get(inputId) as string;
          
          if (input.required && (!value || value.trim() === "")) {
            return { success: false, error: `${input.label} is required` };
          }
          
          if (value) {
            customInputValues.push({
              inputId: new mongoose.Types.ObjectId(inputId),
              value
            });
          }
        }
      }
    }
    
    const registration = new EventRegistration({
      eventId,
      userId,
      teamName: event.isTeamEvent ? formData.get("teamName") : undefined,
      teamMembers,
      customInputValues,
    });
    
    await registration.save();
    
    revalidatePath(`/events/${eventId}`);
    revalidatePath('/my-profile');
    
    return {
      success: true,
      message: "Registration successful",
      registrationId: registration._id.toString()
    };
    
  } catch (error: any) {
    console.error("Registration error:", error);
    
    if (error.code === 11000) {
      return { success: false, error: "You are already registered for this event" };
    }
    
    return { 
      success: false, 
      error: error.message || "An error occurred during registration" 
    };
  }
}

export async function getUserRegisteredEvents() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { success: false, error: "Authentication required" };
    }
    
    const userId = session.user.id;
    
    const registrations = await EventRegistration.find({ userId })
      .populate('eventId')
      .sort({ registrationDate: -1 });
    
    return {
      success: true,
      registrations: JSON.parse(JSON.stringify(registrations))
    };
    
  } catch (error: any) {
    console.error("Fetch registrations error:", error);
    return { 
      success: false, 
      error: error.message || "An error occurred while fetching your registrations" 
    };
  }
}

export async function getEventRegistrations(eventId: string) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { success: false, error: "Authentication required" };
    }

    const userId = session.user.id
    
    const event = await Event.findById(eventId);
    if (!event) {
      return { success: false, error: "Event not found" };
    }
    
    const registrations = await EventRegistration.find({ userId })
      .populate('eventId')
      .sort({ registrationDate: -1 });
    console.log(JSON.parse(JSON.stringify(registrations)))
    return {
      success: true,
      registrations: JSON.parse(JSON.stringify(registrations))
    };
    
  } catch (error: any) {
    console.error("Fetch event registrations error:", error);
    return { 
      success: false, 
      error: error.message || "An error occurred while fetching registrations" 
    };
  }
}