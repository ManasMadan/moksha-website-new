"use client";
import { Playfair } from "next/font/google";
import FAQSection from "@/components/Home/FAQ";
import { useEffect, useState, CSSProperties } from "react";
import {
  AboutUs,
  AfterMovie,
  Footer,
  Gallery,
  PastSponsor,
  Timeline,
} from "@/components/Home";
import Navbar from "@/components/NavBar";
import { cn } from "@/lib/utils";
import { Element } from "react-scroll";

const playfair = Playfair({ subsets: ["latin"] });

export default function Home() {
  const styleStates: CSSProperties[] = [
    {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "90vw",
      transform: "translate(-50%, -50%)",
    },
    {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "max(70vw, 320px)",
      transform: "translate(-50%, -50%)",
    },
    {
      position: "absolute",
      top: "30%",
      left: "50%",
      width: "max(70vw, 320px)",
      transform: "translate(-50%, -50%)",
    },
  ];

  const [styleStateIndex, setStyleStateIndex] = useState(0);
  // New state for background image opacity
  const bgOpacity = styleStateIndex === styleStates.length - 1 ? 1 : 0;
  const isAnimating = styleStateIndex < styleStates.length - 1;

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStyleStateIndex((prev) => prev + 1);
      setTimeout(() => {
        setStyleStateIndex((prev) => prev + 1);
      }, 1500);
    }, 1000);
  }, []);

  return (
    <div className={cn({ "overflow-hidden h-screen": isAnimating })}>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-in-out",
          {
            "opacity-0 -translate-y-full": isAnimating,
            "opacity-100 translate-y-0": !isAnimating,
          },
          { "opacity-0 -translate-y-full": !showNavbar }
        )}
      >
        <Navbar />
      </div>

      <div className="min-h-screen w-full bg-[#131313]">
        <section className="relative flex flex-col min-h-screen bg-[#131313] w-full">
          {/* Background div with fade effect */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 linear"
            style={{
              backgroundImage: "url('/assets/home/section1Bg.png')",
              backgroundPositionX: "center",
              backgroundPositionY: "bottom",
              opacity: bgOpacity,
              transitionDelay: "1s",
            }}
          />

          <div
            className="transition-all duration-1000 linear relative z-10"
            style={styleStates[styleStateIndex]}
          >
            <AnimatingLogo />
          </div>
        </section>
        <div className={cn(`w-full z-[60] bg-[#131313]`, playfair.className)}>
          <Element name="About Us">
            <AboutUs />
          </Element>
        </div>

        <section className="relative flex flex-col min-h-screen bg-[#131313] w-full z-40">
          <Gallery setShowNavbar={setShowNavbar} />
          <AfterMovie />
          <PastSponsor />
        </section>
        <Timeline />

        <div className={`w-full ${playfair.className}`}>
          <FAQSection />
        </div>

        <Element name="Footer">
          <Footer />
        </Element>
      </div>
    </div>
  );
}

function AnimatingLogo() {
  const [birdsVisible, setBirdsVisible] = useState(false);

  useEffect(() => {
    const showBirdsTimer = setTimeout(() => {
      setBirdsVisible(true);
    }, 500);

    return () => clearTimeout(showBirdsTimer);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 1185 442"
    >
      <g id="moksha">
        <mask
          id="mask0_655_215"
          width="1185"
          height="442"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            id="moksha_logo"
            fill="url(#pattern0_655_215)"
            d="M0 .141h1185v441.533H0z"
          ></path>
        </mask>
        <g mask="url(#mask0_655_215)">
          <path id="background" fill="#FFDC9E" d="M-29 89h1245v301H-29z"></path>

          <image
            id="left_bird_img"
            xlinkHref="/assets/hero/left_bird.svg"
            style={{
              opacity: birdsVisible ? 1 : 0,
              transition: "opacity 0.8s ease-in-out, transform 1s ease-in-out",
              transform: birdsVisible
                ? "translate(0, 0)"
                : "translate(-100%, 0)",
              transformOrigin: "center",
            }}
            x="-234"
            y="147"
            width="677"
            height="369"
            preserveAspectRatio="none"
          ></image>

          <image
            id="right_bird_img"
            xlinkHref="/assets/hero/right_bird.svg"
            style={{
              opacity: birdsVisible ? 1 : 0,
              transition: "opacity 0.8s ease-in-out, transform 1s ease-in-out",
              transform: birdsVisible
                ? "translate(0, 0)"
                : "translate(100%, 0)",
              transformOrigin: "center",
            }}
            x="898"
            y="5"
            width="441"
            height="565"
            preserveAspectRatio="none"
          ></image>

          <image
            id="middle_bird_img"
            xlinkHref="/assets/hero/middle_bird.svg"
            style={{
              opacity: birdsVisible ? 1 : 0,
              transition: "opacity 0.8s ease-in-out, transform 1s ease-in-out",
              transform: birdsVisible
                ? "translate(0, 0)"
                : "translate(0, 100%)",
              transformOrigin: "center",
            }}
            x="447"
            y="122"
            width="311.219"
            height="414"
            preserveAspectRatio="none"
          ></image>
        </g>
      </g>
      <defs>
        <pattern
          id="pattern0_655_215"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#image0_655_215"
            transform="matrix(.0004 0 0 .00108 -.209 0)"
          ></use>
        </pattern>
        <image
          xlinkHref="/assets/hero/moksha_logo.png"
          id="image0_655_215"
          width="3508"
          height="922"
          data-name="moksha logo-07 (1)[1](edit).png"
        ></image>
      </defs>
    </svg>
  );
}
