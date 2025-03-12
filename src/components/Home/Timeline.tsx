import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const data = {
  2024: [
    "/assets/timeline/24_1.jpg",
    "/assets/timeline/24_2.jpg",
    "/assets/timeline/24_3.jpg",
  ],
  2023: [
    "/assets/timeline/23_1.jpg",
    "/assets/timeline/23_2.jpg",
    "/assets/timeline/23_3.jpg",
    "/assets/timeline/23_4.jpg",
  ],
  2022: [
    "/assets/timeline/22_2.jpeg",
    "/assets/timeline/22_3.jpeg",
    "/assets/timeline/22_1.jpeg",
  ],
};

const Timeline = () => {
  const [responsiveValues, setResponsiveValues] = useState({
    itemSpacing: 20,
    yearSpacing: 7,
    yearOffset: 10,
  });
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setResponsiveValues({
          itemSpacing: 12,
          yearSpacing: 5,
          yearOffset: 7,
        });
      } else if (window.innerWidth < 768) {
        setResponsiveValues({
          itemSpacing: 18,
          yearSpacing: 6,
          yearOffset: 8,
        });
      } else if (window.innerWidth < 1024) {
        setResponsiveValues({
          itemSpacing: 20,
          yearSpacing: 7,
          yearOffset: 10,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Setup intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // @ts-ignore
            const itemId = entry.target.dataset.itemId;
            setVisibleItems((prev) => ({ ...prev, [itemId]: true }));
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
    );

    // Observe all timeline items after they're rendered
    setTimeout(() => {
      const items = document.querySelectorAll(".timeline-item-container");
      items.forEach((item) => {
        observer.observe(item);
      });
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const { itemSpacing, yearSpacing, yearOffset } = responsiveValues;

  const totalItems = Object.values(data).reduce(
    (acc, images) => acc + images.length,
    0
  );

  const totalHeight =
    totalItems * itemSpacing + Object.keys(data).length * yearSpacing + 5;

  return (
    <div
      className="min-h-screen bg-[#131313] px-8 pt-8 pb-44 relative"
      id="Timeline"
    >
      <div className="absolute left-10 top-0 w-[0.8px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="absolute right-10 top-0 w-[0.8px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="absolute right-14 top-0 w-[0.8px] h-full bg-[#FFFFFF] invisible md:visible" />
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/timeline/bg3.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="max-w-4xl mx-auto" ref={timelineRef}>
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl text-center my-10 font-serif tracking-wider font-semibold relative z-30">
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
                      yearPosition + yearOffset + itemIndex * itemSpacing;
                    const isEvenItem = itemIndex % 2 === 0;
                    const itemId = `${year}-${itemIndex}`;
                    const isVisible = visibleItems[itemId];

                    return (
                      <div
                        key={`${year}-${itemIndex}`}
                        className="absolute left-1/2 timeline-item"
                        style={{
                          top: `${itemPosition}rem`,
                        }}
                      >
                        <div className="absolute -translate-x-1/2 p-3 rounded-full bg-[#FFD58B]">
                          <div className="bg-[#775518] p-3 md:p-6 rounded-full"></div>
                        </div>

                        <div
                          data-item-id={itemId}
                          className={`absolute timeline-item-container flex items-center justify-center z-10 -top-[40px] sm:-top-[62px] md:-top-[92px] ${
                            isEvenItem
                              ? "-translate-x-[calc(100%)] scale-100"
                              : "scale-x-[-1]"
                          } transition-all duration-700 ease-out ${
                            isVisible
                              ? "opacity-100"
                              : isEvenItem
                              ? "opacity-0 -translate-x-[calc(130%)]"
                              : "opacity-0 translate-x-[30%]"
                          }`}
                        >
                          <div className="md:w-60 w-24 sm:w-40 h-28 sm:h-44 md:h-64 border-2 border-[#b8860b] bg-black">
                            <img
                              src={image}
                              alt={`Timeline ${year} Item ${itemIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="relative w-0 h-0 border-t-[64px] border-b-[64px] border-l-[50px] md:border-l-[128px] border-transparent">
                            <div className="absolute -top-[56px] sm:-top-[90px] md:-top-[128px] -left-[50px] md:-left-[128px] w-[50px] md:w-[128px] sm:h-[176px] h-[112px] md:h-[256px] bg-gradient-to-r from-[#FFD58B] to-[#775518] clip-triangle"></div>
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
