import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  position: string;
  imageUrl?: string;
}

const TeamPage: React.FC = () => {
  const coreTeam: TeamMember[] = [
    {
      name: "DEEPTI SAINI",
      position: "",
      imageUrl: "/assets/team/member/DEEPTI.png",
    },
    {
      name: "ADITYA SINGH",
      position: "",
      imageUrl: "/assets/team/member/ADITYA-S.png",
    },
    {
      name: "AYUSH AHLAWAT",
      position: "",
      imageUrl: "/assets/team/member/AYUSH-A.png",
    },
    {
      name: "AGASTYA JHINGAN",
      position: "",
      imageUrl: "/assets/team/member/AGASTYA.png",
    },
    {
      name: "ADITYA NARAYAN SINGH",
      position: "",
      imageUrl: "/assets/team/member/ADITYA-N.png",
    },
    {
      name: "ADITYA DEV",
      position: "",
      imageUrl: "/assets/team/member/ADITYA-D.png",
    },
    {
      name: "VENUS DHARMIK",
      position: "",
      imageUrl: "/assets/team/member/VENUS.png",
    },
    {
      name: "ARSH PODDAR",
      position: "",
      imageUrl: "/assets/team/member/ARSH.png",
    },
    {
      name: "SONAM SINGH",
      position: "",
      imageUrl: "/assets/team/member/SONAM.png",
    },
    {
      name: "ANSH AGGARWAL",
      position: "",
      imageUrl: "/assets/team/member/ANSH.png",
    },
    {
      name: "ANUVRAT DEV",
      position: "",
      imageUrl: "/assets/team/member/ANUVRAT.png",
    },
    {
      name: "AYUSH JHA",
      position: "",
      imageUrl: "/assets/team/member/AYUSH-J.png",
    },
    {
      name: "KIRAT SEHGAL",
      position: "",
      imageUrl: "/assets/team/member/KIRAT.png",
    },
  ];

  const techTeam: TeamMember[] = [
    {
      name: "KAVISH DHAM",
      position: "",
      imageUrl: "/assets/team/member/KAVISH.jpeg",
    },
    {
      name: "MANAS MADAN",
      position: "",
      imageUrl: "/assets/team/member/MANAS.png",
    },
    {
      name: "AJAY PAL SINGH",
      position: "",
      imageUrl: "/assets/team/member/AJAY.jpeg",
    },
    {
      name: "DHEERAJ SHARMA",
      position: "",
      imageUrl: "/assets/team/member/DHEERAJ.png",
    },
    {
      name: "AAKASH RAJ JINDAL",
      position: "",
      imageUrl: "/assets/team/member/AAKASH.png",
    },
    {
      name: "SUYASH SHRIVASTAVA",
      position: "",
      imageUrl: "/assets/team/member/SUYASH.png",
    },
    {
      name: "SANVI KWATRA",
      position: "",
      imageUrl: "/assets/team/member/SANVI.png",
    },
    {
      name: "RIYA ARYA",
      position: "",
      imageUrl: "/assets/team/member/RIYA.png",
    },
    {
      name: "LEISHA AMBWANI",
      position: "",
      imageUrl: "/assets/team/member/LEISHA.png",
    },
    {
      name: "ANUSHKA SRIVASTAVA",
      position: "",
      imageUrl: "/assets/team/member/ANUSHKA.png",
    },
    {
      name: "PRANJUL MANGLA",
      position: "",
      imageUrl: "/assets/team/member/PRANJUL.png",
    },
  ];

  return (
    <div
      className="relative w-full text-white pt-20 bg-black"
      style={{
        minHeight: "100vh",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 z-0 bg-contain bg-no-repeat bg-blend-screen"
        style={{
          backgroundImage: "url('/assets/team/bg.jpeg')",
          backgroundPositionX: "center",        
          opacity: "0.8",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-9xl text-center mb-20 lg:mb-32 font-firlest tracking-wide">
          <span>OUR</span>
          <span className="pl-4 md:pl-8 lg:pl-16">TEAM</span>
        </h1>

        <div className="mb-96">
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-center font-bold mb-12 lg:mb-20 pb-6 lg:pb-14 text-[#FFD58B] border-b border-[#EEECEC]">
            CORE TEAM
          </h2>

          <div
            className="grid mb-16"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              justifyItems: "center",
              gap: "2rem",
            }}
          >
            {coreTeam.map((member, index) => (
              <React.Fragment key={"Frag" + index}>
                <div key={index} className="flex flex-col items-center">
                  <div className="w-64 h-80 relative">
                    <div
                      className="absolute inset-0 bg-contain bg-no-repeat bg-center z-10"
                      style={{
                        backgroundImage: "url('/assets/team/frame.svg')",
                      }}
                    ></div>

                    <div className="absolute inset-2 overflow-hidden">
                      <Image
                        src={
                          member.imageUrl || "/assets/team/member/kavish.png"
                        }
                        alt={member.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#FFD58B] text-center uppercase mt-4">
                    {member.name}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-center font-bold mb-12 lg:mb-20 pb-6 lg:pb-14 text-[#FFD58B] border-b border-[#EEECEC]">
            TECH TEAM
          </h2>

          <div
            className="grid max-w-6xl mx-auto"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              justifyItems: "center",
              gap: "2rem",
            }}
          >
            {techTeam.map((member, index) => (
              <React.Fragment key={"Frag2" + index}>
                <div key={index} className="flex flex-col items-center">
                  <div className="w-64 h-80 relative">
                    <div
                      className="absolute inset-0 bg-contain bg-no-repeat bg-center z-10"
                      style={{
                        backgroundImage: "url('/assets/team/silverFrame.svg')",
                      }}
                    ></div>

                    <div className="absolute inset-2 overflow-hidden">
                      <Image
                        src={
                          member.imageUrl || "/assets/team/member/kavish.png"
                        }
                        alt={member.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white text-center uppercase mt-4">
                    {member.name}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
