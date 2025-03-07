import { Cinzel } from "next/font/google";
import Image from "next/image";

const cizel = Cinzel({
  subsets: ["latin"],
});

interface SponsorProps {
  name?: string;
  image: string;
  className?: string;
}

interface SponsorsBlockProps {
  title: string;
  sponsors: SponsorProps[];
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black w-full relative">
      <div className="fixed inset-0 left-0 z-0 w-full mx-auto h-screen">
        <Image
          src="/assets/sponsors/bg.jpg"
          alt="Background"
          fill
          className="object-cover object-top filter brightness-50 sepia"
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
      <section className="w-11/12 mx-auto pt-28 relative z-10 mb-4 md:mb-8">
        <h1 className="text-center text-white font-firlest text-5xl sm:text-9xl md:text-[145px]">
          Our Sponsors
        </h1>
      </section>
      {Array.from({ length: 3 }).map((_, i) => (
        <SponsorsBlock
          key={i}
          title={`Gold Sponsor ${i + 1}`}
          sponsors={Array.from({ length: (i + 1) * 9 }).map((_, j) => ({
            name: `Gold Sponsor ${i + 1} ${j + 1}`,
            image: dummyImg,
            className:
              j % 2 === 0 ? "col-span-1 row-span-1" : "col-span-2 row-span-2",
          }))}
        />
      ))}
    </main>
  );
}

function SponsorsBlock({ title, sponsors }: SponsorsBlockProps) {
  return (
    <section className="w-10/12 mx-auto py-2 md:py-6 relative z-10">
      <h2
        className={`text-white text-2xl md:text-4xl text-center font-bold ${cizel.className}`}
      >
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4 items-center justify-center content-center grid-flow-dense">
        {sponsors.map((sponsor, i) => (
          <div
            key={i}
            className={`relative w-full aspect-video rounded-md overflow-hidden bg-color1 ${sponsor.className}`}
          >
            <Image
              src={sponsor.image || dummyImg}
              alt={sponsor.name || `${title} Sponsor ${i + 1}`}
              fill={true}
              className={`object-contain object-center mix-blend-multiply col-span-1 row-span-1 rounded-md`}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}

const dummyImg =
  "https://www.cx-gl.org.uk/uploads/monthly_2018_07/large.sponsor-placeholder_1.jpg.63f181d8716cc0762679fa3dd67721fc.jpg.fe7b4d84da188471aa5ccf355f629e82.jpg";
