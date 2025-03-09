"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Koulen } from "next/font/google";
import { registerUser } from "@/app/server/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    collegeName: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "fullName" || name === "collegeName") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (name === "mobile") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "email") {
      newValue = value.replace(/[^\w@.-]/g, "");
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
    } else if (name === "fullName" || name === "collegeName") {
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
    } else if (name === "email") {
      if (
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab" &&
        e.key !== "Enter" &&
        e.key !== "@" &&
        e.key !== "." &&
        e.key !== "_" &&
        e.key !== "-" &&
        !/^[A-Za-z0-9]$/.test(e.key)
      ) {
        e.preventDefault();
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const result = await registerUser(formDataObj);

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || "Registration failed");
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

      <div className="w-full max-w-md py-10 mx-4 sm:mx-auto z-10">
        <div className="relative bg-black/20 rounded-3xl border border-color1/20 p-8">
          <h1 className="text-color1 text-3xl text-center font-semibold">
            SIGN-UP
          </h1>
          <p className="text-white text-center text-sm mb-8">
            PLEASE FILL the FORM TO CREATE AN ACCOUNT
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
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                required
              />
            </div>

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
                Email ID*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
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

            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-color1" />
                  ) : (
                    <Eye className="h-5 w-5 text-color1" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Confirm Password*
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-color1" />
                  ) : (
                    <Eye className="h-5 w-5 text-color1" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-color1 text-white py-3 rounded-lg font-bold hover:bg-color1/80 transition-colors text-2xl disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  SIGNING UP...
                </span>
              ) : (
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] filter">
                  SIGN UP
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-white/50 flex-1" />
              <span className="text-white uppercase">or</span>
              <div className="h-px bg-white/50 flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full bg-white text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${koulen.className} disabled:opacity-70`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Image
                  src="/assets/icons/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              )}
              CONTINUE WITH GOOGLE
            </button>

            <p className="text-center text-white font-bold">
              ALREADY HAVE AN ACCOUNT?{" "}
              <Link
                href="/auth/login"
                className="text-color1 underline underline-offset-[5px] font-[740]"
              >
                LOG IN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
