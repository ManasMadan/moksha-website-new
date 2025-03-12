"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { completeSignup } from "@/app/server/auth";
import { signOut, useSession } from "next-auth/react";

export default function CompleteSignupPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, update } = useSession();

  const [formData, setFormData] = useState({
    mobile: "",
    collegeName: "",
    dob: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "collegeName") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (name === "mobile") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;

    if (name === "mobile") {
      if (
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab" &&
        e.key !== "Enter" &&
        !/^\d$/.test(e.key)
      ) {
        e.preventDefault();
      }
    } else if (name === "collegeName") {
      if (
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab" &&
        e.key !== "Enter" &&
        e.key !== " " &&
        !/^[A-Za-z]$/.test(e.key)
      ) {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.mobile || !formData.collegeName || !formData.dob) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const result = await completeSignup(formDataObj);

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        await update({
          isProfileComplete: true,
        });
        setTimeout(() => {
          router.push("/my-profile");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || "Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center pt-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/auth/registerBg.png"
          alt="Background"
          fill
          className="object-cover object-[85%]"
          priority
        />
      </div>

      <div className="w-full max-w-md py-10 mx-4 sm:mx-auto z-0 relative">
        <div className="relative bg-black/20 rounded-3xl border border-color1/20 p-8">
          <h1 className="text-color1 text-3xl text-center font-semibold">
            COMPLETE SIGN-UP
          </h1>
          <p className="text-white text-center text-sm mb-8">
            PLEASE FILL THE FORM TO COMPLETE YOUR PROFILE
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-white text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-white text-center">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Mobile No.*
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                College Name*
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Date of Birth*
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold appearance-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-color1 text-white py-3 rounded-lg font-bold hover:bg-color1/80 transition-colors text-2xl disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  SUBMITTING...
                </span>
              ) : (
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] filter">
                  COMPLETE SIGN UP
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
