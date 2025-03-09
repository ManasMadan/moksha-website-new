"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Playfair } from "next/font/google";
import { Cinzel } from "next/font/google";
import { getUserDetails } from "@/app/server/auth";
import { getUserRegisteredEvents } from "@/app/server/registrations";
import EventCard from "@/components/EventCard";


const playfair = Playfair({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    collegeName: "",
    dob: "",
  });
  const [userEvents, setUserEvents] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        try {
          const result = await getUserDetails(session.user.email);
          const events = await getUserRegisteredEvents();
          if (result.success && result.userData) {
            setUserData(result.userData);
          } else if (result.error) {
            console.error("Error fetching user data:", result.error);
          }
          if (events.success) {
            console.log(events);
            setUserEvents(events.registrations);
          } else if (events.error) {
            console.error("Error fetching user data:", events.error);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
        setIsLoading(false);
      }
    }

    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      if (session.user && !session.user.isProfileComplete) {
        router.push(
          `/auth/complete-signup?email=${encodeURIComponent(
            session?.user?.email || ""
          )}`
        );
      } else {
        fetchUserData();
      }
    }
  }, [status, router, session]);

  const filteredEvents = selectedDay
    ? userEvents.filter((event: { eventId: { day: number } }) => event.eventId.day === selectedDay)
    : userEvents;

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-[#202020] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/assets/profile/bg.png')" }}
      >
        <Loader2 className="h-12 w-12 animate-spin text-color1" />
        <p className="mt-4 text-white text-xl">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#202020] pb-6 md:pb-12 pt-20 md:pt-40 px-4 sm:px-6 lg:px-8 xl:px-40 bg-cover bg-no-repeat bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/assets/profile/bg.png')" }}
    >
      <div
        className={`w-full bg-contain bg-no-repeat bg-center text-white p-6 sm:p-10 md:p-16 lg:p-20 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-14 flex flex-col ${playfair.className}`}
        style={{
          backgroundImage: "url('/assets/profile/mainFrame.png')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold space-y-2 uppercase">
          <h3 className="pl-4 sm:pl-8">Name</h3>
          <p className="w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full bg-black border border-[#FFD58B] truncate">
            {userData.fullName}
          </p>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold space-y-2 uppercase">
          <h3 className="pl-4 sm:pl-8">College</h3>
          <p className="w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full bg-black border border-[#FFD58B] truncate">
            {userData.collegeName}
          </p>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold space-y-2 uppercase">
          <h3 className="pl-4 sm:pl-8">Registered Email</h3>
          <p className="w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full bg-black border border-[#FFD58B] truncate">
            {userData.email}
          </p>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold space-y-2 uppercase">
          <h3 className="pl-4 sm:pl-8">Contact Number</h3>
          <p className="w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full bg-black border border-[#FFD58B] truncate">
            {userData.mobile}
          </p>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold space-y-2 uppercase">
          <h3 className="pl-4 sm:pl-8">Events Registered</h3>
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${cinzel.className}`}
          >
            <button
              onClick={() => setSelectedDay(selectedDay === 1 ? null : 1)}
              className={`w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full border border-[#FFD58B] text-center ${
                selectedDay === 1 ? "bg-[#FFD58B] text-black" : "bg-black"
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => setSelectedDay(selectedDay === 2 ? null : 2)}
              className={`w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full  border border-[#FFD58B] text-center ${
                selectedDay === 2 ? "bg-[#FFD58B] text-black" : "bg-black"
              }`}
            >
              Day 2
            </button>
            <button
              onClick={() => setSelectedDay(selectedDay === 3 ? null : 3)}
              className={`w-full px-4 sm:px-8 py-3 sm:py-6 rounded-full border border-[#FFD58B] text-center ${
                selectedDay === 3 ? "bg-[#FFD58B] text-black" : "bg-black"
              }`}
            >
              Day 3
            </button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div
            className="grid justify-center items-center content-center align-middle gap-x-8 gap-y-16 max-w-7xl mx-auto"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map(function (event: { eventId: { _id: string; name: string; imageKey: string; startTime: string; endTime: string; venue: string; day: number; }; }, i: Key | null | undefined) {
                return (
                  <EventCard
                    key={i}
                    eventId={event.eventId._id}
                    eventName={event.eventId.name}
                    eventImage={event.eventId.imageKey}
                    eventStartTime={event.eventId.startTime}
                    eventEndTime={event.eventId.endTime}
                    eventVenue={event.eventId.venue}
                    eventDay={event.eventId.day}
                    showRegister={false}
                  />
                );
              })
            ) : (
              <div className="text-white text-center col-span-full py-8">
                No events Registered
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}