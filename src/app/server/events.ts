"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getEvents() {
  try {
    const client = await clientPromise;
    const db = client.db("moksha-dashboard");

    const events = await db
      .collection("events")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return { events: JSON.parse(JSON.stringify(events)), error: null };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { events: [], error: "Failed to fetch events" };
  }
}

export async function getEvent(id: string) {
  try {
    if (!ObjectId.isValid(id)) {
      return { event: null, error: "Invalid event ID" };
    }

    const client = await clientPromise;
    const db = client.db("moksha-dashboard");

    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return { event: null, error: "Event not found" };
    }

    return { event: JSON.parse(JSON.stringify(event)), error: null };
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return { event: null, error: "Failed to fetch event" };
  }
}
