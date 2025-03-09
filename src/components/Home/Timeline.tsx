import React from "react";
import Image from "next/image";

const data = {
  2024: [
    "/assets/timeline/24_1.jpg",
    "/assets/timeline/24_2.jpg",
    "/assets/timeline/24_3.jpg",
    "/assets/timeline/24_4.jpg",
    "/assets/timeline/24_5.jpg",
  ],
  2023: [
    "/assets/timeline/23_1.jpg",
    "/assets/timeline/23_2.jpg",
    "/assets/timeline/23_3.jpg",
    "/assets/timeline/23_4.jpg",
    "/assets/timeline/23_5.jpg",
    "/assets/timeline/23_6.jpg",
    "/assets/timeline/23_7.jpg",
  ],
  2022: [
    "/assets/timeline/22_1.jpeg",
    "/assets/timeline/22_2.jpeg",
    "/assets/timeline/22_3.jpeg",
    "/assets/timeline/22_4.jpeg",
  ],
};

const Timeline = () => {
  const totalItems = Object.values(data).reduce(
    (acc, images) => acc + images.length,
    0
  );

  const itemSpacing = 10;
  const yearSpacing = 7;
  const totalHeight =
    totalItems * itemSpacing + Object.keys(data).length * yearSpacing + 20;

  return (
    <div className="min-h-screen bg-[#131313] px-8 pt-8 pb-44 relative">
      <div className="fixed left-5 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="fixed right-5 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="fixed right-8 top-0 w-[0.5px] h-full bg-[#FFFFFF] invisible md:visible" />
    
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
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl text-center my-10 font-serif tracking-wider font-semibold">
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

          {Object.entries(data)
            .reverse()
            .map(([year, images], yearIndex) => {
              const previousYearsItems = Object.entries(data)
                .reverse()
                .slice(0, yearIndex)
                .reduce((acc, [_, imgs]) => acc + imgs.length, 0);

              const yearPosition =
                4 + previousYearsItems * itemSpacing + yearIndex * yearSpacing;

              return (
                <React.Fragment key={year}>
                  <div
                    className={`absolute ${
                      yearIndex % 2 === 0
                        ? "left-1/2 pl-1 text-left"
                        : "right-1/2 pr-1 text-right"
                    } flex items-center`}
                    style={{
                      top: `${yearPosition}rem`,
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
                    const itemPosition =
                      yearPosition + 6 + itemIndex * itemSpacing;
                    const isEvenItem = itemIndex % 2 === 0;

                    return (
                      <div
                        key={`${year}-${itemIndex}`}
                        className="absolute left-1/2"
                        style={{
                          top: `${itemPosition}rem`,
                        }}
                      >
                        <div className="absolute -translate-x-1/2 p-3 rounded-full bg-[#FFD58B]">
                          <div className="bg-[#775518] p-3 md:p-6 rounded-full"></div>
                        </div>

                        <div
                          className={`absolute flex items-center justify-center z-10 -top-[40px] md:-top-[28px] ${
                            isEvenItem
                              ? "-translate-x-[calc(100%)] scale-100"
                              : "scale-x-[-1]"
                          }`}
                        >
                          <div className="md:w-32 w-28 h-28 md:h-32 border-2 border-[#b8860b] bg-black">
                            <img
                              src={image}
                              alt={`Timeline ${year} Item ${itemIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="relative w-0 h-0 border-t-[64px] border-b-[64px] border-l-[50px] md:border-l-[128px] border-transparent">
                            <div className="absolute -top-[56px] md:-top-[64px] -left-[50px] md:-left-[128px] w-[50px] md:w-[128px] h-[112px] md:h-[128px] bg-gradient-to-r from-[#FFD58B] to-[#775518] clip-triangle"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
