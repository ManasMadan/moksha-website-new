import Link from "next/link";
import React from "react";

const RegistrationCompletePage: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-right bg-no-repeat bg-cover text-white space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12"
      style={{ backgroundImage: 'url("/assets/events/registered.png")' }}
    >
      <h1 className="font-firlest text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase">
        Regis tra tion Form
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-5xl text-center">
        Congratulations! You have been registered for the event. We request you
        to be present at the given time and venue.
      </p>

      <Link
        href={"/events"}
        className="py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 lg:py-5 lg:px-12 xl:py-6 xl:px-14 2xl:py-8 2xl:px-16 rounded-3xl bg-[#FFD58B] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl text-black font-firlest"
      >
        Back to Events
      </Link>
    </div>
  );
};

export default RegistrationCompletePage;
