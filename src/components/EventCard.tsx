import Image from "next/image";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
});

const frameCorner = "/assets/events/frame-corner.png";

function EventCard() {
  return (
    <div className="flex justify-center items-center">
    <div className="bg-color1 w-full h-auto aspect-[9/16] shadow-black shadow-md p-4 relative min-w-64 max-w-80 @container">
      <Frame>
        <div className="w-full h-full flex justify-center flex-col">
          <div className="flex-1 flex justify-center content-center flex-col">
            <h2 className="font-firlest text-color2 text-center text-3xl @[200px]:text-4xl @[250px]:text-5xl"> 
              Event Name
            </h2>
            <div className="my-4 relative w-full aspect-[5/4]">
              <Image
                src={"/assets/events/card-img.png"}
                alt="event-image"
                fill={true}
                className="rounded-lg"
              />
            </div>
            <ul className={`font-cinzel text-color2 my-2`}>
              <li className="flex items-center space-x-2">
              <span className="text-xl @[200px]:text-xl @[250px]:text-2xl uppercase font-bold">
                Time -{" "}
              </span>
              <span className="text-base @[200px]:text-lg @[250px]:text-xl">10:00 AM</span>
              </li>
              <li className="flex items-center space-x-2">
              <span className="text-xl @[200px]:text-xl @[250px]:text-2xl uppercase font-bold">
                Venue -{" "}
              </span>
              <span className="text-base @[200px]:text-lg @[250px]:text-xl">Online</span>
              </li>
              <li className="flex items-center space-x-2">
              <span className="text-xl @[200px]:text-xl @[250px]:text-2xl uppercase font-bold">
                Day -{" "}
              </span>
              <span className="text-base @[200px]:text-lg @[250px]:text-xl">1</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center mb-5 relative z-10">
            <button className="bg-color2 text-color1 w-11/12 mx-auto  py-1 md:py-2 rounded-md font-firlest text-2xl">
              Register Now
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
    <div className="border-black border-2 w-full h-full relative">
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
        className="mix-blend-multiply absolute -bottom-3 -left-4  -rotate-90"
      />
      <Image
        src={frameCorner}
        alt="frame-corner"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -bottom-3 -right-4  -rotate-180"
      />
      <div className="w-11/12 mx-auto h-full">{children}</div>
    </div>
  );
}

export default EventCard;
