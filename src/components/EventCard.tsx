import Image from "next/image";
import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
});

const frameCorner = "/assets/events/frame-corner.png";

function EventCard({
  eventId,
  eventName,
  eventImage,
  eventStartTime,
  eventEndTime,
  eventVenue,
  eventDay,
  showRegister = true,
}: {
  eventId: string;
  eventName: string;
  eventImage: string;
  eventStartTime: string;
  eventEndTime: string;
  eventVenue: string;
  eventDay: number;
  showRegister?: boolean;
}) {
  return (
    <div className={`flex justify-center items-center`}>
      <div className="bg-color1 w-full h-auto shadow-black shadow-md p-4 relative min-w-64 max-w-80 @container">
        <Frame>
          <div className="w-full h-full grid grid-rows-[80px_auto_auto_60px] gap-2 pb-6">
            <div className="flex items-center justify-center">
              <h2 className="font-firlest text-color2 text-2xl @[200px]:text-3xl @[250px]:text-4xl leading-tight px-1 line-clamp-2 overflow-hidden text-center">
                {eventName}
              </h2>
            </div>
            <div className="relative w-full aspect-[5/4]">
              <img
                src={
                  `/api/images/${eventImage}` || "/assets/events/card-img.png"
                }
                alt="event-image"
                className="rounded-lg object-cover h-full w-full"
              />
            </div>

            <div className="self-start h-full">
              <div className="grid grid-cols-[80px_1fr] gap-x-5 gap-y-3 font-cinzel text-color2">
                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left">
                  TIME -
                </span>
                <span className="text-base @[250px]:text-lg truncate">
                  {eventStartTime} Onwards
                </span>

                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left">
                  DAY -
                </span>
                <span className="text-base @[250px]:text-lg truncate">
                  {eventDay}
                </span>

                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left self-start whitespace-nowrap">
                  VENUE -
                </span>
                <div className="overflow-hidden h-14">
                  <p className="text-base @[250px]:text-lg line-clamp-2 break-words">
                    {eventVenue}
                  </p>
                </div>
              </div>
            </div>
            {showRegister && (
              <div className="self-end w-full">
                <Link
                  href={`/events/register/${eventId}`}
                  className="bg-color2 text-color1 w-full block py-2 text-center rounded-md font-firlest text-xl @[250px]:text-2xl"
                >
                  REGIS TER NOW
                </Link>
              </div>
            )}
          </div>
        </Frame>
      </div>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-black border-2 w-full h-full relative overflow-hidden">
      <Image
        src={frameCorner}
        alt="frame-corner"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -top-3 -left-4"
      />
      <Image
        src={frameCorner}
        alt="frame-corner"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -top-3 -right-4 rotate-90"
      />
      <Image
        src={frameCorner}
        alt="frame-corner"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -bottom-3 -left-4 -rotate-90"
      />
      <Image
        src={frameCorner}
        alt="frame-corner"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -bottom-3 -right-4 -rotate-180"
      />
      <div className="w-11/12 mx-auto h-full py-3 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default EventCard;
