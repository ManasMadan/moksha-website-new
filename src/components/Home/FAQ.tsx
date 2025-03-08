"use client";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What is Moksha'25?",
      answer:
        "Moksha is the annual cultural festival of NSUT, a 3 - day long escape from reality into a whole different world of magic, mystery and innovation that takes place in the month of March. More than a fest, it has been a celebration of triumphs and an unforgettable experience of entertainment. After an electrifying comeback in 2024, we' re back bigger, bolder and more transformed than ever before.",
    },
    {
      question: "Where will Moksha'25 take place?",
      answer:
        "Moksha'25 is a 3 day annual cultural extravaganza, organized in the month of March to be held at NSUT Main Campus, Dwarka.",
    },
    {
      question: "Who all can attend Moksha'25?",
      answer:
        "The event is open to all college students. Participants must carry a valid ID for entry.",
    },
    {
      question:
        "What are the events in Moksha'25?",
      answer:
        "Every year, Moksha brings alive a world of magic and imagination ranging from captivating dramatics to dazzling dance performances, driven by the energetic hosts and enthusiastic participants.",
    },
    {
      question:
        "Is Moksha accepting outside Delhi-NCR teams to participate in their events?",
      answer:
        "Yes, Moksha is accepting participants in their amazing and innovative events from all across the country.",
    },
    {
      question:
        "How can I register for the fest?",
      answer:
        "You can register online through our official website or on-site during the event. Follow us on social media for updates about the registration links.",
    },
    {
      question:
        "How will I get the updates about events?",
      answer:
        "Each event details will be shared on our official website and official instagram handle @mokshansut. The itinerary for the events all throughout the fest will be released along with detailed rules and eligibility criteria for each event.",
    },
    {
      question:
        "Who should I contact for further queries?",
      answer:
        "For additional questions, email us at moksha@nsut.ac.in And follow us on our instagram handle for further updates @mokshansut.",
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
        height={500}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-auto h-[80%] sm:h-full"
      />
      <Image
        src="/assets/home/faqLeftDragon.png"
        alt="dragon"
        width={500}
        height={500}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-auto h-[60%] sm:h-full z-30 mix-blend-lighten"
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
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-500 ease-in-out ${
                    openFaqIndex === index ? "transform rotate-180" : ""
                  }`}
                  color="#FFD58B"
                />
              </div>
            </button>

            <AnimatePresence>
              {openFaqIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.3 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-2 pb-4 px-4 mt-2 text-2xl bg-transparent backdrop-blur-md text-white bg-center bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: "url('/assets/home/faqBtn.png')",
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;