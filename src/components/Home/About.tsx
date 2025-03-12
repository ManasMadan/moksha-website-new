import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="w-full py-48 bg-center bg-cover" style={{backgroundImage:"url('/assets/events/noise.png')"}}>
      <div className="py-36 text-center z-10 relative overflow-hidden">
        <h1 className="text-[#FFD58B] text-5xl uppercase z-20 relative">
          About Us
        </h1>
        <p
          className={`max-w-[80%] xl:max-w-[1188px] mx-auto text-white pt-8 text-lg sm:text-xl md:text-2xl font-medium relative z-20`}
        >
          Step into the enchanting world of Moksha, where the air is electrified
          with endless creativity, enthusiasm and every heartbeat reverberates
          with the spirit of liberation. Moksha is more than just a festival,
          it's an emotion. It's an amalgamation of talent and high energy. This
          marks as a platform for all which is an expression that goes beyond
          the mundane festival experience. With colors and sounds at the
          dramatics showcase, where the stage comes alive with performances that
          go beyond imagination. Feel the rhythm in your soul at Battle of
          Bands, as guitars wail and drums thunder in exhilarating harmony. Lose
          yourself in the fashion of Rouge and witness the raw energy of Step
          Up, where dancers defy gravity with every move. Moksha is an
          extraordinary universe where art breathes and passion speaks.
        </p>
        <Image
          src="/assets/home/horseLeft.png"
          alt="horseLeft"
          width={500}
          height={0}
          objectFit="contain"
          className="absolute top-1/2 -translate-y-1/2 -left-48 h-[75%] md:-left-40 md:h-[80%] lg:-left-20 lg:h-[90%] xl:left-0 w-auto xl:h-full"
        />
        <Image
          src="/assets/home/horseRight.png"
          alt="horseRight"
          width={500}
          height={0}
          objectFit="contain"
          className="absolute top-1/2 -translate-y-1/2 -right-48 h-[75%] md:-right-40 md:h-[80%] lg:-right-20 lg:h-[90%] xl:right-0 w-auto xl:h-full"
        />
      </div>
    </div>
  );
}
