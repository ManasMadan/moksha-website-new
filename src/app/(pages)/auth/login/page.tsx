"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Koulen } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
});

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error || "");
  const [success, setSuccess] = useState("");
  
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

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/my-profile" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrorMessage("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess("");
    
    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      
      if (result?.error) {
        setErrorMessage("Invalid email or password");
      } else {
        setSuccess("Login successful");
        router.push("/my-profile");
      }
    } catch (error) {
      setErrorMessage("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-white text-center">
              {errorMessage}
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
                Email
              </label>
              <input
                type="text"
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none text-black font-semibold"
                  required
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
                  href="/auth/forgot-password"
                  className="text-white underline text-sm font-semibold"
                >
                  FORGOT PASSWORD?
                </Link>
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
                  SIGNING IN...
                </span>
              ) : (
                "SIGN IN"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
