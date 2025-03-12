"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function Gallery({
  setShowNavbar,
}: {
  setShowNavbar: (show: boolean) => void;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const THRESHOLD_HIDE = 0.6;
  const THRESHOLD_FULL = 1.0;
  const MAX_BLUR = 5;
  const [visibilityRatio, setVisibilityRatio] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibilityRatio(entry.intersectionRatio);
        setShowNavbar(entry.intersectionRatio < THRESHOLD_HIDE);
      },
      {
        root: null,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, [setShowNavbar]);

  const blurValue =
    visibilityRatio < THRESHOLD_HIDE
      ? 0
      : ((visibilityRatio - THRESHOLD_HIDE) /
          (THRESHOLD_FULL - THRESHOLD_HIDE)) *
        MAX_BLUR;

  return (
    <ParallaxProvider>
      <div className="relative mb-[10vh]">
        {/* Fixed Background Gallery */}
        <div
          ref={galleryRef}
          className={cn(
            "flex justify-center items-center w-full h-screen sticky top-0 px-4 py-8 z-0 overflow-hidden"
          )}
          style={{
            backgroundImage: "url(/assets/home/gallery/bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: `blur(${blurValue}px)`,
            transition: "filter 0.2s ease-out",
          }}
        >
          <img
            alt="Gallery"
            src="/assets/home/gallery/text.png"
            className="max-w-[min(60vw,60vh)] w-full max-h-full z-10"
          />

          <div className="border-[#FFD58B] border-2 max-w-[min(65vh,65vw)] max-h-[min(65vh,65vw)] w-full h-full aspect-square absolute"></div>
          <div className="border-[#FFD58B] rotate-45 border-2 max-w-[min(65vh,65vw)] max-h-[min(65vh,65vw)] w-full h-full aspect-square absolute"></div>
        </div>

        <div className="relative z-10 pointer-events-none">
          <Parallax className="w-full pointer-events-auto pb-[100vh]">
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-5 sm:gap-20 max-w-[1200px] mx-auto place-items-center p-12">
              <div className="sm:col-span-4 flex flex-col gap-5 sm:gap-20 justify-center items-center w-full">
                {[1, 3, 5, 7, 9].map((i) => (
                  <div
                    key={i}
                    className="w-full overflow-hidden rounded-lg relative col-span-1"
                  >
                    <img
                      src={`/assets/home/gallery/${i}.png`}
                      alt="Event photo"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              <div className="sm:col-span-3 flex flex-col gap-5 sm:gap-20 justify-center items-center">
                {[2, 4, 6, 8, 10, 11].map((i) => (
                  <div
                    key={i}
                    className="w-full overflow-hidden rounded-lg relative col-span-1"
                  >
                    <img
                      src={`/assets/home/gallery/${i}.png`}
                      alt="Event photo"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </ParallaxProvider>
  );
}
