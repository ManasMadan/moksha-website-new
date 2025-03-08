"use client";
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [sectionOffset, setSectionOffset] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      setSectionOffset(rect.top + window.scrollY);
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        setSectionOffset(rect.top + window.scrollY);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const relativeScroll = Math.max(0, scrollY - sectionOffset);

  const transitionRange = windowHeight * 0.7;

  const eyeBlurAmount = Math.min(
    15,
    (relativeScroll / (transitionRange * 0.5)) * 15
  );

  const eyeAndTextOpacity = Math.max(
    0,
    1 - relativeScroll / (transitionRange * 0.6)
  );

  return (
    <div className="w-full" ref={galleryRef}>
      <div className="relative">
        <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden sticky top-0">
          <div className="absolute inset-0 z-10">
            <div className="w-full h-full flex items-center justify-center">
              <div className="container max-w-5xl mx-auto">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/1.png"
                      alt="Concert performance"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/2.png"
                      alt="Singer performance"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="aspect-[4/3] overflow-hidden rounded-lg relative col-span-2">
                    <img
                      src="/assets/home/gallery/3.png"
                      alt="Stage lighting"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/4.png"
                      alt="Band performance"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/5.png"
                      alt="Festival crowd"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/6.png"
                      alt="Event photo"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-lg relative col-span-1">
                    <img
                      src="/assets/home/gallery/7.png"
                      alt="Music event"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="aspect-[16/9] overflow-hidden rounded-lg relative col-span-3">
                    <img
                      src="/assets/home/gallery/8.png"
                      alt="Festival highlight"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 z-20"
            style={{
              opacity: eyeAndTextOpacity || 0,
              transition: "opacity 0.3s ease, filter 0.3s ease",
              filter: `blur(${eyeBlurAmount}px)`,
            }}
          >
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: "url('/assets/home/galleryEye.png')",
                backgroundSize: "100% 100%",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[35rem] h-[35rem] border border-[#FFD58B] absolute"></div>
              <div className="w-[35rem] h-[35rem] border border-[#FFD58B] absolute rotate-45"></div>
            </div>
          </div>

          <h1
            className="text-9xl font-bold text-[#FFD58B] relative z-30"
            style={{
              opacity: eyeAndTextOpacity,
              transition: "opacity 0.3s ease, filter 0.3s ease",
              filter: `blur(${eyeBlurAmount}px)`,
            }}
          >
            Gallery
          </h1>
        </div>
      </div>

      <div style={{ height: "10vh" }}></div>
    </div>
  );
}
