"use client";
import { Playfair } from "next/font/google";
import FAQSection from "@/components/Home/FAQ";
import { useEffect, useState, useRef } from "react";
import {
  AboutUs,
  AfterMovie,
  Footer,
  Gallery,
  PastSponsor,
} from "@/components/Home";
import Navbar from "@/components/NavBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Timeline from "./(pages)/timeline/page";

const playfair = Playfair({ subsets: ["latin"] });

export default function Home() {
  const [animationStage, setAnimationStage] = useState<
    "initial" | "scaling" | "moving" | "complete"
  >("initial");

  const finalLogoRef = useRef<HTMLDivElement | null>(null);
  const animatedLogoRef = useRef<HTMLDivElement | null>(null);

  const [finalPosition, setFinalPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!finalLogoRef.current || !animatedLogoRef.current) return;

    const screenWidth = window.innerWidth;
    const logoWidth = screenWidth * 0.9;
    const finalLogoBoundingBox = finalLogoRef.current.getBoundingClientRect();

    const aspect = finalLogoBoundingBox.width / finalLogoBoundingBox.height;

    if (animationStage === "initial") {
      animatedLogoRef.current.style.width = `${logoWidth}px`;
      animatedLogoRef.current.style.height = `${logoWidth / aspect}px`;
      animatedLogoRef.current.style.top = `50%`;
      animatedLogoRef.current.style.left = `50%`;
      animatedLogoRef.current.style.transform = `translate(-50%, -50%)`;

      setTimeout(() => {
        setAnimationStage("scaling");
      }, 1000);
    }

    if (animationStage === "scaling") {
      animatedLogoRef.current.style.width = `${finalLogoBoundingBox.width}px`;
      animatedLogoRef.current.style.height = `${finalLogoBoundingBox.height}px`;

      // Give the birds enough time to animate (1000ms for fade-in + 1000ms for movement)
      setTimeout(() => {
        setAnimationStage("moving");
      }, 2400);
    }

    if (animationStage === "moving") {
      animatedLogoRef.current.style.transform = `translate(0%, 0%)`;
      animatedLogoRef.current.style.top = `${finalLogoBoundingBox.top}px`;
      animatedLogoRef.current.style.left = `${finalLogoBoundingBox.left}px`;

      setTimeout(() => {
        setAnimationStage("complete");
      }, 1000);
    }
  }, [animationStage]);

  const isAnimating = animationStage !== "complete";
  const isScaling = animationStage === "scaling";
  const isMoving = animationStage === "moving";

  return (
    <div className={cn({ "overflow-hidden h-screen relative": isAnimating })}>
      {/* Navbar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-in-out",
          {
            "opacity-0 -translate-y-full": isAnimating,
            "opacity-100 translate-y-0": !isAnimating,
          }
        )}
      >
        <Navbar />
      </div>

      <div className="min-h-screen w-full">
        <section
          className="relative flex flex-col min-h-screen bg-[#131313] w-full bg-cover bg-no-repeat pt-40"
          style={{
            backgroundImage: "url('/assets/home/section1Bg.png')",
            backgroundPositionX: "center",
          }}
        >
          <div className="w-full">
            <div className="w-3/4 max-w-6xl mx-auto">
              {/* Static Logo (Only Visible After Animation Completes) */}
              <div
                ref={finalLogoRef}
                style={{
                  opacity: animationStage === "complete" ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
              >
                <Image
                  src="/assets/hero/moksha.png"
                  alt="logo"
                  width={500}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
            </div>

            {/* Animated Logo (Scaling & Moving) */}
            {isAnimating && <AnimatingLogo animatedLogoRef={animatedLogoRef} />}

            {/* Title */}
            <h1
              className={cn(
                "text-5xl text-[#FFD58B] text-center mt-8 transition-all duration-1000 ease-in-out",
                {
                  "opacity-0 translate-y-10": isAnimating,
                  "opacity-100 translate-y-0": !isAnimating,
                }
              )}
            >
              Myth and Mysteries
            </h1>
          </div>

          {/* About Section */}
          <div
            className={cn(`w-full`, playfair.className, {
              "opacity-0": isAnimating,
              "opacity-100 transition-opacity duration-1000 delay-500":
                !isAnimating,
            })}
          >
            <AboutUs />
          </div>
        </section>

        <section
          className="relative flex flex-col min-h-screen bg-[#131313] w-full bg-cover bg-no-repeat pt-40 z-40"
          style={{
            backgroundImage: "url('/assets/home/section2Bg.png')",
            backgroundPositionX: "center",
          }}
        >
          <Gallery />
          <AfterMovie />
          <PastSponsor />
        </section>
        <Timeline />

        <div className={`w-full ${playfair.className}`}>
          <FAQSection />
        </div>

        <Footer />
      </div>
    </div>
  );
}

function AnimatingLogo({ animatedLogoRef }: { animatedLogoRef: any }) {
  const [birdsVisible, setBirdsVisible] = useState(false);
  const [birdsInPosition, setBirdsInPosition] = useState(false);

  useEffect(() => {
    // Show birds after a short delay
    const showBirdsTimer = setTimeout(() => {
      setBirdsVisible(true);

      // Move birds to their final positions after they appear
      setTimeout(() => {
        setBirdsInPosition(true);
      }, 800);
    }, 400);

    return () => clearTimeout(showBirdsTimer);
  }, []);

  return (
    <div
      ref={animatedLogoRef}
      style={{
        position: "fixed",
        zIndex: 40,
        transition: "all 0.2s linear, width 0.4s linear, height 0.4s linear",
        width: "90vw",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
      }}
    >
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
            <path
              id="background"
              fill="#FFDC9E"
              d="M-29 89h1245v301H-29z"
            ></path>

            <image
              id="left_bird_img"
              xlinkHref="/assets/hero/left_bird.svg"
              style={{
                opacity: birdsVisible ? 1 : 0,
                transition:
                  "opacity 0.8s ease-in-out, transform 1s ease-in-out",
                transform: birdsInPosition
                  ? "translate(0, 0)"
                  : "translate(calc(50vw - 210px), 0)",
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
                transition:
                  "opacity 0.8s ease-in-out, transform 1s ease-in-out",
                transform: birdsInPosition
                  ? "translate(0, 0)"
                  : "translate(calc(-50vw + 210px), 0)",
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
                transition:
                  "opacity 0.8s ease-in-out, transform 1s ease-in-out",
                transform: birdsInPosition
                  ? "translate(0, 0)"
                  : "translate(0, 100px)",
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
    </div>
  );
}
