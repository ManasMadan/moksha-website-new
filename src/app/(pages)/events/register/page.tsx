"use client";

import React, { useState } from "react";

const RegistrationForm = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "",
      age: "",
      college: "",
      email: "",
      phone: "",
      yearOfPassing: "",
      sameAsLead: false,
    },
  ]);

  const [teamName, setTeamName] = useState("");

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        name: "",
        age: "",
        college: "",
        email: "",
        phone: "",
        yearOfPassing: "",
        sameAsLead: false,
      },
    ]);
  };

  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value,
    };
    setTeamMembers(newTeamMembers);
  };

  const handleSameAsLead = (index: number) => {
    if (index === 0) return;

    const newTeamMembers = [...teamMembers];
    const leadMember = teamMembers[0];

    if (!newTeamMembers[index].sameAsLead) {
      newTeamMembers[index] = {
        ...newTeamMembers[index],
        name: leadMember.name,
        age: leadMember.age,
        college: leadMember.college,
        email: leadMember.email,
        phone: leadMember.phone,
        yearOfPassing: leadMember.yearOfPassing,
        sameAsLead: true,
      };
    } else {
      newTeamMembers[index] = {
        name: "",
        age: "",
        college: "",
        email: "",
        phone: "",
        yearOfPassing: "",
        sameAsLead: false,
      };
    }

    setTeamMembers(newTeamMembers);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted:", { teamMembers, teamName });
  };

  return (
    <div
      className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-12 sm:py-24 md:py-36"
      style={{
        backgroundImage: "url('/assets/events/registerBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-16 sm:mb-24 md:mb-32 lg:mb-44 text-center font-firlest uppercase">
          Regis<span className="pl-1 sm:pl-2">t</span>ra
          <span className="pl-1 sm:pl-2">t</span>ion Form
        </h1>

        <div className="mb-20 sm:mb-28 md:mb-32 lg:mb-40">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 font-firlest">
            Event Name
          </h2>
          <p className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
            DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
            DESCRIPTION DESCRIPTION
          </p>

          <div className="mb-6 sm:mb-8 md:mb-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl space-y-4 sm:space-y-6">
            <p>DAY - 1</p>
            <p>TIME - 12PM</p>
            <p>VENUE - AMUL GROUNDS</p>
          </div>

          <div className="text-[#FFD58B] mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            <p>• ALL THE FIELDS MARKED WITH AN (*) ARE MANDATORY TO FILL</p>
            <p>
              • PLEASE CLICK SUBMIT AFTER FILLING THE FORM GIVEN BELOW TO
              PROCEED WITH YOUR REGISTRATION
            </p>
          </div>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-10 sm:mb-16 md:mb-20 font-bold">
          PARTICIPANT DETAILS
        </h3>

        {teamMembers.map((member, index) => (
          <div key={index} className="mb-12 sm:mb-16 md:mb-20">
            {index > 0 && (
              <div className="mb-4 flex items-center font-bold text-xl sm:text-2xl md:text-3xl">
                <span className="text-gray-400">
                  ALL DETAILS SAME AS THE LEAD MEMBER -
                </span>
                <input
                  type="checkbox"
                  checked={member.sameAsLead}
                  onChange={() => handleSameAsLead(index)}
                  className="checkbox-custom ml-2"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-xl sm:text-2xl md:text-3xl">
              <div>
                <label className="block mb-2">NAME *</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>

              <div>
                <label className="block mb-2">PHONE NO. (OPTIONAL)</label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "phone", e.target.value)
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>

              <div>
                <label className="block mb-2">AGE *</label>
                <input
                  type="number"
                  value={member.age}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "age", e.target.value)
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>

              <div>
                <label className="block mb-2">YEAR OF PASSING *</label>
                <input
                  type="text"
                  value={member.yearOfPassing}
                  onChange={(e) =>
                    handleTeamMemberChange(
                      index,
                      "yearOfPassing",
                      e.target.value
                    )
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2">
                  COLLEGE/INSTITUTE/UNIVERSITY *
                </label>
                <input
                  type="text"
                  value={member.college}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "college", e.target.value)
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2">EMAIL ID *</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "email", e.target.value)
                  }
                  className="w-full p-2 bg-[#999999] rounded-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTeamMember}
          className="mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 py-2 bg-white text-black rounded-full flex items-center gap-2 hover:bg-white/80 transition-colors text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Add another team member
          <div className="h-8 w-8 sm:h-12 sm:w-12 md:h-[4.5rem] md:w-[4.5rem] flex items-center justify-center bg-black rounded-full">
            <span className="text-4xl sm:text-6xl md:text-8xl text-white">
              +
            </span>
          </div>
        </button>

        <div className="mb-12 sm:mb-16 md:mb-20 font-bold text-2xl sm:text-3xl md:text-4xl">
          <label className="block mb-2">
            TEAM NAME/ REPRESENTATIONAL NAME *
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 bg-[#D9D9D9] rounded-xl text-black"
            required
          />
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className="mx-auto px-8 sm:px-16 md:px-32 lg:px-48 py-3 sm:py-4 md:py-6 bg-[#FFD58B] uppercase text-black font-firlest rounded-[35px] hover:bg-yellow-400 transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Submi<span className="pl-1 sm:pl-2">t</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
