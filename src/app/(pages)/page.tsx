"use client";
import { Playfair } from "next/font/google";
import FAQSection from "@/components/Home/FAQ";
import { useEffect, useRef, useState } from "react";
import {
  AboutUs,
  AfterMovie,
  Footer,
  Gallery,
  Hero,
  PastSponsor,
  Timeline
} from "@/components/Home";

const playfair = Playfair({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <section
        className="relative flex flex-col min-h-screen bg-[#131313] w-full bg-cover bg-no-repeat pt-40"
        style={{
          backgroundImage: "url('/assets/home/section1Bg.png')",
          backgroundPositionX: "center",
        }}
      >
        <Hero />
        <div className={`w-full ${playfair.className}`}>
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
      <Timeline/>
      <div className={`w-full ${playfair.className}`}>
        <FAQSection />
      </div>

      <Footer />
    </div>
  );
}
