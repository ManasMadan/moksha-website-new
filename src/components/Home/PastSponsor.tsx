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
        {Array(13)
          .fill(null)
          .map((_, rowIndex) => {
            // Calculate opacity based on row position
            // First few rows are more visible, later rows fade more
            const opacity = Math.max(10, 100 - (rowIndex * 7));

            return Array(4)
              .fill(null)
              .map((_, colIndex) => {
                // Calculate the image number (1-52)
                const imageNumber = rowIndex * 4 + colIndex + 1;
                
                // Only render if we haven't exceeded 52 images
                if (imageNumber <= 52) {
                  return (
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

                      <div className="relative z-10 h-full w-full p-2 bg-white">
                        <Image 
                          src={`/assets/home/past-sponsors/${imageNumber}.png`} 
                          fill 
                          alt={`sponsor ${imageNumber}`} 
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              });
          })}
      </div>
    </div>
  );
}