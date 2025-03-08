import Image from "next/image";

export default function PastSponsor() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 mt-10">
      <h1 className="text-5xl text-center text-[#FFD58B] mb-10 md:mb-20">
        past sponsors
      </h1>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full max-w-6xl bg-contain bg-center bg-no-repeat px-4 sm:px-8 md:px-16 lg:px-20 py-4 relative"
        style={{
          backgroundImage: "url('/assets/home/afterMovieFrame.png')",
          backgroundSize: "100% 100%",
        }}
      >
        {Array(5)
          .fill(null)
          .map((_, rowIndex) => {
            const opacity =
              rowIndex === 0
                ? 100
                : rowIndex === 1
                ? 60
                : rowIndex === 2
                ? 40
                : rowIndex === 3
                ? 20
                : 10;

            return Array(4)
              .fill(null)
              .map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="relative aspect-video flex items-center justify-center"
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  <div className="absolute inset-0 bg-transparent rounded-sm overflow-hidden">
                    <div
                      className="absolute top-0 left-0 right-0 h-px bg-[#E1C38C]"
                      style={{ opacity: opacity / 100 }}
                    ></div>

                    <div
                      className="absolute top-0 right-0 bottom-0 w-px bg-[#E1C38C]"
                      style={{ opacity: opacity / 100 }}
                    ></div>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#E1C38C]"
                      style={{ opacity: (opacity * 0.7) / 100 }}
                    ></div>

                    <div
                      className="absolute top-0 left-0 bottom-0 w-px bg-[#E1C38C]"
                      style={{ opacity: opacity / 100 }}
                    ></div>
                  </div>

                  <div className="relative z-10 h-full w-full bg-white p-2">
                    <Image src={`/assets/home/past-sponsors/${(rowIndex*4)+colIndex+1}.png`} fill alt="sponsor" className="object-contain"/>
                  </div>
                </div>
              ));
          })}
      </div>
    </div>
  );
}