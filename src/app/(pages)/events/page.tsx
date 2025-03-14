"use client";

import React, { HTMLAttributes, useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import EventCard from "@/components/EventCard";
import Image from "next/image";
import { getEvents } from "@/app/server/events";

const cizel = Cinzel({
  subsets: ["latin"],
});

const CATEGORIES = [
  "ALL",
  "Creative Arts",
  "Music",
  "Dance",
  "Theatre",
  "Culture and Lifestyle",
];

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { events: fetchedEvents, error: fetchError } = await getEvents();
        if (fetchedEvents) {
          setEvents(fetchedEvents);
        }
        if (fetchError) {
          setError(fetchError);
        }
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "ALL"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black w-full relative">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="fixed md:absolute top-0 left-0 right-0 bottom-0 z-0 w-full mx-auto h-[3900px] max-h-[3900px]">
            <Image
              src="/assets/events/eventsBg.png"
              alt="Background"
              fill
              className="object-cover object-top w-screen"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/events/noise.png"
              alt="Noise Texture"
              fill
              className="object-cover object-center mix-blend-overlay opacity-40"
              priority
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[3900px] max-h-[3900px] overflow-y-auto">
        <section className="w-11/12 mx-auto pt-28 relative z-10">
          <h1 className="text-center text-white font-firlest text-7xl sm:text-9xl md:text-[145px]">
            Events
          </h1>
          <div className="w-11/12 max-w-5xl mx-auto my-8 md:my-10 lg:my-12 flex justify-center items-center content-center flex-wrap gap-4 md:gap-6 uppercase">
            {CATEGORIES.map((category, i) => (
              <CustomButton
                key={i}
                className={
                  selectedCategory === category ? "bg-color1/50 text-white" : ""
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CustomButton>
            ))}
          </div>
        </section>
        <section className="w-10/12 mx-auto py-6 pb-16 md:pb-20">
          {loading ? (
            <div className="text-white text-center col-span-full py-8">
              Loading events...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4 bg-black/30 rounded">
              Error loading events: {error}
            </div>
          ) : (
            <div
              className="grid justify-center items-center content-center align-middle gap-x-8 gap-y-16 max-w-7xl mx-auto"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents.map(function (event, i) {
                  return (
                    <EventCard
                      key={i}
                      eventId={event._id}
                      eventName={event.name}
                      eventImage={event.imageKey}
                      eventStartTime={event.startTime}
                      eventEndTime={event.endTime}
                      eventVenue={event.venue}
                      eventDay={event.day}
                    />
                  );
                })
              ) : (
                <div className="text-white text-center col-span-full py-8">
                  No events found for this category
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function CustomButton(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border-2 border-color1 px-3 md:px-4 py-1 text-color1 font-cizel font-semibold rounded-full text-xs sm:text-sm md:text-base whitespace-nowrap hover:bg-color1/20 transition-colors duration-300 ${cizel.className} ${props.className}`}
    >
      {props.children}
    </button>
  );
}
