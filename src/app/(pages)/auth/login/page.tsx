"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Koulen } from "next/font/google";

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    if (name === "email") {
      newValue = value.replace(/[^\w@.-]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    
    if (name === "email") {
      if (
        (e.key !== "Backspace" && 
         e.key !== "Delete" && 
         e.key !== "ArrowLeft" && 
         e.key !== "ArrowRight" && 
         e.key !== "Tab" && 
         e.key !== "Enter" && 
         e.key !== "@" && 
         e.key !== "." && 
         e.key !== "_" && 
         e.key !== "-" && 
         !/^[A-Za-z0-9]$/.test(e.key))
      ) {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/auth/loginBg.png"
          alt="Background"
          fill
          className="object-cover object-[85%]"
          priority
        />
      </div>

      <div className="w-full max-w-md mx-4 sm:mx-auto z-10">
        <div className="relative bg-black/20 rounded-3xl border border-color1/20 p-8">
          <h1 className="text-color1 text-3xl text-center mb-8 font-bold">
            LOG-IN
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white uppercase text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
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
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-white underline text-sm font-semibold"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-color1 text-white py-3 rounded-lg font-bold hover:bg-color1/80 transition-colors text-2xl"
            >
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] filter">
                SIGN IN
              </span>
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-white/50 flex-1" />
              <span className="text-white uppercase">or</span>
              <div className="h-px bg-white/50 flex-1" />
            </div>

            <button
              type="button"
              className={`w-full bg-white text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${koulen.className}`}
            >
              <Image
                src="/assets/icons/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
              CONTINUE WITH GOOGLE
            </button>

            <p className="text-center text-white font-bold">
              CREATE A NEW ACCOUNT{" "}
              <Link
                href="/auth/register"
                className="text-color1 underline underline-offset-[5px] font-[740]"
              >
                SIGN UP
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}