import Image from "next/image";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
});

const frameCorner = "/assets/events/frame-corner.png";

function EventCard({
  eventName,
  eventImage,
  eventStartTime,
  eventEndTime,
  eventVenue,
  eventDay,
}: {
  eventName: string;
  eventImage: string;
  eventStartTime: string;
  eventEndTime: string;
  eventVenue: string;
  eventDay: number;
}) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-color1 w-full h-auto shadow-black shadow-md p-4 relative min-w-64 max-w-80 @container">
        <Frame>
          <div className="w-full h-full grid grid-rows-[80px_auto_auto_60px] gap-2 pb-6">
            <div className="flex items-center justify-center">
              <h2 className="font-firlest text-color2 text-2xl @[200px]:text-3xl @[250px]:text-4xl leading-tight px-1 line-clamp-2 overflow-hidden text-center">
                {eventName}
              </h2>
            </div>
            <div className="relative w-full aspect-[5/4]">
              <Image
                src={eventImage || "/assets/events/card-img.png"}
                alt="event-image"
                fill={true}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="self-start h-full">
              <div className="grid grid-cols-[80px_1fr] gap-x-5 gap-y-3 font-cinzel text-color2">
                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left">
                  TIME -
                </span>
                <span className="text-base @[250px]:text-lg truncate">
                  {eventStartTime} - {eventEndTime}
                </span>

                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left self-start whitespace-nowrap">
                  VENUE -
                </span>
                <div className="overflow-hidden h-16">
                  <p className="text-base @[250px]:text-lg line-clamp-2">
                    {eventVenue}
                  </p>
                </div>

                <span className="text-lg @[250px]:text-xl font-bold uppercase text-left">
                  DAY -
                </span>
                <span className="text-base @[250px]:text-lg truncate">
                  {eventDay}
                </span>
              </div>
            </div>
            <div className="self-end w-full">
              <button className="bg-color2 text-color1 w-full py-2 rounded-md font-firlest text-xl @[250px]:text-2xl">
                REGISTER NOW
              </button>
            </div>
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
