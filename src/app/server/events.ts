'use server';

import { revalidatePath } from "next/cache";
import { connectToDB as connectDB } from "@/lib/mongoose";
import Event from "@/lib/models/Event";
import mongoose from "mongoose";

export async function getEvents() {
  try {
    await connectDB();
    
    const events = await Event.find({})
      .sort({ day: 1, createdAt: -1 })
      .lean();
    
    return { events: JSON.parse(JSON.stringify(events)), error: null };
  } catch (error: any) {
    console.error("Failed to fetch events:", error);
    return { events: [], error: error.message || "Failed to fetch events" };
  }
}

export async function getEvent(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { event: null, error: "Invalid event ID" };
    }

    await connectDB();
    
    const event = await Event.findById(id).lean();
    
    if (!event) {
      return { event: null, error: "Event not found" };
    }
    
    return { event: JSON.parse(JSON.stringify(event)), error: null };
  } catch (error: any) {
    console.error("Failed to fetch event:", error);
    return { event: null, error: error.message || "Failed to fetch event" };
  }
}