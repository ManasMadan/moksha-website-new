"use server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/webUser";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const collegeName = formData.get("collegeName") as string;
    const dob = formData.get("dob") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation
    if (
      !fullName ||
      !mobile ||
      !email ||
      !collegeName ||
      !dob ||
      !password ||
      !confirmPassword
    ) {
      return { error: "All fields are required" };
    }

    if (!/^\d{10}$/.test(mobile)) {
      return { error: "Invalid mobile number format" };
    }

    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      return { error: "Invalid email format" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 8) {
      return { error: "Password must be at least 8 characters" };
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      mobile,
      email,
      collegeName,
      dob: new Date(dob),
      password: hashedPassword,
      isProfileComplete: true,
    });

    return { success: "Registration successful, please login" };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "Registration failed" };
  }
}

export async function completeSignup(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const mobile = formData.get("mobile") as string;
    const collegeName = formData.get("collegeName") as string;
    const dob = formData.get("dob") as string;

    // Validation
    if (!email || !mobile || !collegeName || !dob) {
      return { error: "All fields are required" };
    }

    if (!/^\d{10}$/.test(mobile)) {
      return { error: "Invalid mobile number format" };
    }

    await connectToDB();

    // Update user profile
    await User.updateOne(
      { email },
      {
        $set: {
          mobile,
          collegeName,
          dob: new Date(dob),
          isProfileComplete: true,
        },
      }
    );

    return { success: "Profile completed successfully" };
  } catch (error: any) {
    console.error("Complete signup error:", error);
    return { error: error.message || "Failed to complete profile" };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    await connectToDB();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    return { success: "Login successful", redirect: "/my-profile" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: error.message || "Login failed" };
  }
}

export async function getUserDetails(email: string) {
  try {
    await connectToDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "User not found" };
    }

    // Return user details without sensitive information
    return {
      success: true,
      userData: {
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        collegeName: user.collegeName,
        dob: user.dob ? user.dob.toISOString().split("T")[0] : null,
        isProfileComplete: user.isProfileComplete,
      },
    };
  } catch (error: any) {
    console.error("Get user details error:", error);
    return { error: error.message || "Failed to fetch user details" };
  }
}
