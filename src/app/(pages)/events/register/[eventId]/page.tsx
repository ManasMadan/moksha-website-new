"use client";

import { registerForEvent } from "@/app/server/registrations";
import { getEvent } from "@/app/server/events";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ICustomInput, IEvent } from "@/lib/models/Event";
import { toast } from "react-hot-toast";
import { Calendar } from "lucide-react";

interface TeamMember {
  name: string;
  age: string;
  college: string;
  email: string;
  phone: string;
  yearOfPassing: string;
  sameAsLead: boolean;
}

interface CustomInputValues {
  [key: string]: string | File;
}

const RegistrationForm = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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

  const [teamName, setTeamName] = useState<string>("");
  const [customInputValues, setCustomInputValues] = useState<CustomInputValues>(
    {}
  );
  const [showRegistrationClosed, setShowRegistrationClosed] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(eventId);

        if (!eventData.event) {
          setError(eventData.error || "Failed to load event data");
          toast.error(eventData.error || "Failed to load event data");
          return;
        }

        setEvent(eventData.event);

        if (
          eventData.event.customInputs &&
          eventData.event.customInputs.length > 0
        ) {
          const initialValues: CustomInputValues = {};
          eventData.event.customInputs.forEach((input: ICustomInput) => {
            initialValues[input._id.toString()] = "";
          });
          setCustomInputValues(initialValues);
        }
      } catch (e: any) {
        console.error(e);
        setError(e.message || "An error occurred while fetching event data");
        toast.error(e.message || "An error occurred while fetching event data");
      }
    };

    fetchEvent();
  }, [eventId]);

  const addSpaceBeforeT = (input: string): string => {
    return input.replace(/([^ ])([tT])/g, "$1 $2");
  };

  const validateEmail = (email: string) => {
    const trustedDomains = [
      "gmail.com",
      "outlook.com",
      "proton.me",
      "tutanota.com",
      "mailfence.com",
      "icloud.com",
      "yahoo.com",
      "zoho.com",
      "gmx.com",
      "mail.com",
    ];

    const domain = email.split("@")[1]?.toLowerCase();
    return domain && trustedDomains.includes(domain);
  };

  const validateIndianPhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const addTeamMember = () => {
    if (!event) return;

    if (teamMembers.length >= event.maxNumberOfTeamMembers) {
      toast.error(
        `Maximum team size is ${event.maxNumberOfTeamMembers} members`
      );
      return;
    }

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

  const removeTeamMember = (index: number) => {
    if (index === 0) return;

    const newTeamMembers = [...teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamMembers(newTeamMembers);
  };

  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    let newValue = value;

    if (field === "name" || field === "college") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (field === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "email") {
      newValue = value.replace(/[^\w@.-]/g, "");
    } else if (field === "age") {
      newValue = value.replace(/\D/g, "").slice(0, 2);
    } else if (field === "yearOfPassing") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: newValue,
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

  const handleCustomInputChange = (inputId: string, value: string | File) => {
    setCustomInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const validateCustomInputs = () => {
    if (!event?.customInputs) return true;

    let isValid = true;

    event.customInputs.forEach((input) => {
      const inputId = input._id.toString();
      const value = customInputValues[inputId];

      if (typeof value === "object") return;

      if (!input.required && (!value || value === "")) return;

      if (input.type === "email" && typeof value === "string") {
        if (!validateEmail(value)) {
          toast.error(`${input.label} must use a trusted domain`);
          isValid = false;
        }
      }

      if (input.type === "phone" && typeof value === "string") {
        if (!validateIndianPhone(value)) {
          toast.error(`${input.label} must be a valid Indian phone number`);
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    if (!event.acceptingRegistrations) {
      setShowRegistrationClosed(true);
      toast.error("Registration for this event is closed");
      return;
    }

    if (
      event.isTeamEvent &&
      teamMembers.length < event.minNumberOfTeamMembers
    ) {
      toast.error(
        `Minimum required team members is ${event.minNumberOfTeamMembers}`
      );
      return;
    }

    let hasInvalidData = false;

    for (const member of teamMembers) {
      if (member.email && !validateEmail(member.email)) {
        toast.error(
          `Email for ${member.name || "team member"} must use a trusted domain`
        );
        hasInvalidData = true;
      }

      if (member.phone && !validateIndianPhone(member.phone)) {
        toast.error(
          `Phone number for ${
            member.name || "team member"
          } must be a valid Indian number (10 digits starting with 6-9)`
        );
        hasInvalidData = true;
      }
    }

    if (!validateCustomInputs()) {
      hasInvalidData = true;
    }

    if (hasInvalidData) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("teamMembersCount", teamMembers.length.toString());

      teamMembers.forEach((member, index) => {
        formData.append(`teamMember[${index}].name`, member.name);
        formData.append(`teamMember[${index}].age`, member.age);
        formData.append(`teamMember[${index}].college`, member.college);
        formData.append(`teamMember[${index}].email`, member.email);
        formData.append(`teamMember[${index}].phone`, member.phone || "");
        formData.append(
          `teamMember[${index}].yearOfPassing`,
          member.yearOfPassing
        );
      });

      if (event.isTeamEvent) {
        formData.append("teamName", teamName);
      }

      Object.entries(customInputValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await registerForEvent(formData);
      console.log("Result", result);

      if (result.success) {
        toast.success("Registration successful!");
        setTimeout(() => router.push("/events/registration-complete"), 1000);
      } else {
        setError(result.error || "Registration failed");
        toast.error(result.error || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCustomInput = (input: ICustomInput) => {
    const {
      _id,
      type,
      label,
      placeholder,
      required,
      options,
      fileType,
      maxSize,
    } = input;
    const inputId = _id.toString();

    switch (type) {
      case "shortText":
        return (
          <input
            type="text"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            placeholder={placeholder || ""}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "longText":
        return (
          <textarea
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            placeholder={placeholder || ""}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl min-h-[100px]"
            required={required}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            placeholder={placeholder || ""}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "email":
        return (
          <input
            type="email"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            placeholder={placeholder || "example@gmail.com"}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "phone":
        return (
          <input
            type="tel"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
              handleCustomInputChange(inputId, cleaned);
            }}
            placeholder={placeholder || "10-digit Indian mobile number"}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "select":
        return (
          <select
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          >
            <option value="">Select an option</option>
            {options &&
              options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        );

      case "date":
        return (
          <div className="relative">
            <input
              type="date"
              value={(customInputValues[inputId] as string) || ""}
              onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
              className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
              required={required}
            />
            <Calendar
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black pointer-events-none"
              fill="none"
            />
          </div>
        );

      case "time":
        return (
          <input
            type="time"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "link":
        return (
          <input
            type="url"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            placeholder={placeholder || "https://..."}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );

      case "file":
        const acceptAttribute = fileType
          ? fileType === "pdf"
            ? ".pdf"
            : fileType === "image"
            ? "image/*"
            : fileType === "video"
            ? "video/*"
            : undefined
          : undefined;

        return (
          <div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  if (
                    maxSize &&
                    e.target.files[0].size > maxSize * 1024 * 1024
                  ) {
                    toast.error(`File size must be less than ${maxSize}MB`);
                    e.target.value = "";
                    return;
                  }
                  handleCustomInputChange(inputId, e.target.files[0]);
                }
              }}
              className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-black file:text-white"
              required={required}
              accept={acceptAttribute}
            />
            {fileType && (
              <p className="text-sm text-gray-400 mt-1">
                Accepted file type: {fileType.toUpperCase()}
                {maxSize && ` (max ${maxSize}MB)`}
              </p>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={(customInputValues[inputId] as string) || ""}
            onChange={(e) => handleCustomInputChange(inputId, e.target.value)}
            className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
            required={required}
          />
        );
    }
  };

  if (event && !event.acceptingRegistrations) {
    return (
      <div
        className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-12 sm:py-24 md:py-36 pt-40 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/assets/events/registerBg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-16 text-center font-firlest uppercase">
          {addSpaceBeforeT(event.name)}
        </h1>

        <div className="bg-black/80 p-8 rounded-2xl max-w-2xl mx-auto border border-[#FFD58B]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-6 font-firlest text-[#FFD58B]">
            Registration Closed
          </h2>
          <p className="text-xl sm:text-2xl text-center mb-8">
            We're sorry, but registrations for this event are currently closed.
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-[#FFD58B] uppercase text-black font-firlest rounded-[35px] hover:bg-yellow-400 transition-colors text-xl sm:text-2xl"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const RegistrationClosedPopup = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-[#FFD58B] rounded-2xl p-8 max-w-xl w-full animate-fadeIn">
        <h3 className="text-3xl md:text-4xl font-firlest text-[#FFD58B] mb-6 text-center">
          Registration Closed
        </h3>
        <p className="text-xl text-center mb-8">
          Sorry, the admin has disabled event registrations.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setShowRegistrationClosed(false)}
            className="px-8 py-3 bg-[#FFD58B] uppercase text-black font-firlest rounded-[35px] hover:bg-yellow-400 transition-colors text-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-12 sm:py-24 md:py-36 pt-40"
      style={{
        backgroundImage: "url('/assets/events/registerBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {showRegistrationClosed && <RegistrationClosedPopup />}

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-16 sm:mb-24 md:mb-32 lg:mb-44 text-center font-firlest uppercase">
          Regis<span className="pl-1 sm:pl-2">t</span>ra
          <span className="pl-1 sm:pl-2">t</span>ion Form
        </h1>

        <div className="mb-20 sm:mb-28 md:mb-32 lg:mb-40">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 font-firlest">
            {addSpaceBeforeT(event?.name || "")}
          </h2>
          <p className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {event?.description}
          </p>

          <div className="mb-6 sm:mb-8 md:mb-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl space-y-4 sm:space-y-6">
            <p>DAY : {event?.day}</p>
            <p>
              TIME : {event?.startTime} - {event?.endTime}
            </p>
            <p>VENUE : {event?.venue}</p>
          </div>

          {event?.isTeamEvent && (
            <div className="mb-6 text-xl sm:text-2xl font-bold">
              <p className="text-[#FFD58B]">
                • TEAM SIZE: {event.minNumberOfTeamMembers} -{" "}
                {event.maxNumberOfTeamMembers} MEMBERS
              </p>
            </div>
          )}

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
            <div className="flex justify-between items-center mb-4">
              {index > 0 ? (
                <div className="flex items-center font-bold text-lg sm:text-xl md:text-2xl">
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
              ) : (
                <div className="font-bold text-2xl sm:text-3xl md:text-4xl">
                  TEAM LEAD
                </div>
              )}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="text-red-500 hover:text-red-700 transition-colors font-bold text-xl"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-lg sm:text-xl md:text-2xl">
              <div>
                <label className="block mb-2">NAME *</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "name", e.target.value)
                  }
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
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
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
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
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
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
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
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
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
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
                  className="w-full p-1.5 bg-[#999999] rounded-xl text-base md:text-lg lg:text-xl"
                  required
                  disabled={index > 0 && member.sameAsLead}
                />
              </div>
            </div>
          </div>
        ))}

        {event?.isTeamEvent && (
          <>
            {teamMembers.length < (event?.maxNumberOfTeamMembers || 1) && (
              <button
                type="button"
                onClick={addTeamMember}
                className="mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 py-2 bg-white text-black rounded-full flex items-center gap-2 hover:bg-white/80 transition-colors text-2xl font-bold"
              >
                Add another team member
                <div className="h-8 w-8 sm:h-12 sm:w-12 flex items-center justify-center bg-black rounded-full">
                  <span className="text-4xl sm:text-6xl text-white">+</span>
                </div>
              </button>
            )}

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
          </>
        )}

        {event?.customInputs && event.customInputs.length > 0 && (
          <div className="mb-20 sm:mb-28 md:mb-32">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-10 sm:mb-16 md:mb-20 font-bold">
              ADDITIONAL DETAILS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold text-lg sm:text-xl md:text-2xl">
              {event.customInputs.map((input) => (
                <div
                  key={input._id.toString()}
                  className={input.type === "longText" ? "md:col-span-2" : ""}
                >
                  <label className="block mb-2">
                    {input.label} {input.required && "*"}
                  </label>
                  {renderCustomInput(input)}
                </div>
              ))}
            </div>
          </div>
        )}

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
