"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What is Moksha'23?",
      answer:
        "Moksha is the annual cultural festival of XYZ College. It features a variety of events including music, dance, art, literary competitions and more.",
    },
    {
      question: "Where will Moksha'23 take place?",
      answer:
        "Moksha'23 will take place at our college campus located in Delhi. The festival will be spread across various venues including the main auditorium, sports complex, and open air theater.",
    },
    {
      question: "What are the events in Moksha'23?",
      answer:
        "Moksha'23 features a wide range of events including Battle of Bands, Dance competitions, Art exhibitions, Literary events, Theater performances, and various workshops.",
    },
    {
      question:
        "Is Moksha accepting outside Delhi-NCR teams to participate in their events?",
      answer:
        "Yes, Moksha welcomes participants from all over the country. Teams from outside Delhi-NCR can register online through our website and participate in all open events.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#131313] p-8 relative">
      <h2 className="text-5xl mb-16 text-[#FFD58B] z-50 relative">FAQ'S</h2>
      <Image
        src="/assets/home/faqRightDragon.png"
        alt="dragon"
        width={500}
        height={0}
        objectFit="contain"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-auto h-[80%] sm:h-full"
      />
      <Image
        src="/assets/home/faqLeftDragon.png"
        alt="dragon"
        width={500}
        height={0}
        objectFit="contain"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-auto h-[60%] sm:h-full z-30 mix-blend-lighten"
        style={{ width: "auto", height: "100%" }}
      />
      <div className="absolute inset-0 bg-[#131313] opacity-70"></div>
      <Image
        src={"/assets/home/noise.png"}
        fill
        alt="noise"
        className="z-10 relative bg-blend-overlay"
      />

      <div className="w-full max-w-6xl z-30 relative">
        {faqItems.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full py-3 px-4 flex items-center justify-center text-center relative text-white bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/assets/home/faqBtn.png')",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex items-center justify-center w-full max-w-[80%] space-x-3">
                <span className="text-2xl">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${
                    openFaqIndex === index ? "transform rotate-180" : ""
                  }`}
                  color="#FFD58B"
                />
              </div>
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: openFaqIndex === index ? "200px" : "0",
                opacity: openFaqIndex === index ? 1 : 0,
              }}
            >
              {openFaqIndex === index && (
                <div
                  className="pt-2 pb-4 px-4 mt-2 text-2xl bg-transparent backdrop-blur-md text-white bg-center bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: "url('/assets/home/faqBtn.png')",
                    backgroundSize: "100% 100%",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
