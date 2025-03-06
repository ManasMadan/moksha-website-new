import React from "react";
import Image from "next/image";

const data = {
  2022: [
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
  ],
  2023: [
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
  ],
  2024: [
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
  ],
  2025: [
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
    "/assets/timeline/temp.jpeg",
  ],
};

const Timeline = () => {
  let totalItems = 0;
  Object.values(data).forEach((images) => {
    totalItems += images.length;
  });

  const totalHeight = 13 + totalItems * 10;

  return (
    <div className="min-h-screen bg-[#131313] px-8 pt-24 pb-44 relative">
      <div className="fixed left-5 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="fixed right-5 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="fixed right-8 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />

      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/timeline/bg1.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10">
        <Image
          src="/assets/timeline/bg2.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl text-center mb-10 font-serif tracking-wider font-semibold">
          TIMELINE
        </h1>

        <div className="relative" style={{ height: `${totalHeight}rem` }}>
          <div
            className="absolute left-1/2 -translate-x-[5px] w-[3px] bg-[#FFD58B]"
            style={{ height: `${totalHeight}rem` }}
          />
          <div
            className="absolute left-1/2 translate-x-[2px] w-[3px] bg-[#FFD58B]"
            style={{ height: `${totalHeight}rem` }}
          />
          <img
            src="/assets/timeline/dragon.png"
            className="w-2/5 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pl-3"
          />

          {Object.entries(data).map(([year, images], yearIndex) => (
            <React.Fragment key={year}>
              <div
                className={`absolute ${
                  yearIndex % 2 === 0 ? "left-1/2 pl-1" : "right-1/2 pr-1"
                } flex items-center`}
                style={{
                  top: `calc(60px + ${yearIndex * 30}rem)`,
                }}
              >
                {yearIndex % 2 === 0 ? (
                  <>
                    <div
                      className="bg-[#FFD58B] h-[2px] md:h-[3px] lg:h-1"
                      style={{ width: "calc(20vw)" }}
                    ></div>
                    <h1 className="text-[#FFD58B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 font-[540]">
                      {year}
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-[#FFD58B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 font-[540]">
                      {year}
                    </h1>
                    <div
                      className="bg-[#FFD58B] h-[2px] md:h-[3px] lg:h-1"
                      style={{ width: "calc(20vw)" }}
                    ></div>
                  </>
                )}
              </div>

              {images.map((image, itemIndex) => {
                const totalItemIndex = Object.values(data)
                  .slice(0, yearIndex)
                  .reduce((acc, curr) => acc + curr.length, itemIndex);

                return (
                  <div
                    key={itemIndex}
                    className="relative"
                    style={{
                      top: `calc(100px + ${
                        yearIndex * 30 + itemIndex * 10
                      }rem)`,
                    }}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 p-2 lg:p-3 rounded-full bg-[#FFD58B]">
                      <div className="bg-[#775518] p-4 lg:p-6 rounded-full"></div>
                    </div>

                    <div
                      className={`absolute flex items-center justify-center z-10 scale-75 lg:scale-100 -top-[40px] lg:-top-[28px] ${
                        totalItemIndex % 2 === 0
                          ? "-ml-[220px] lg:-ml-[256px] left-1/2"
                          : "-mr-[220px] lg:-mr-[256px] right-1/2 transform  scale-75 lg:scale-100 scale-x-[-.75] lg:scale-x-[-1]"
                      }`}
                    >
                      <div className="w-32 h-32 border-2 border-[#b8860b] bg-black">
                        <img
                          src={image}
                          alt={`Timeline ${year} Item ${itemIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative w-0 h-0 border-t-[64px] border-b-[64px] border-l-[128px] border-transparent">
                        <div className="absolute -top-[64px] -left-[128px] w-[128px] h-[128px] bg-gradient-to-r from-[#FFD58B] to-[#775518] clip-triangle"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
