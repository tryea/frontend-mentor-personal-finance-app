"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signUpSchema, type SignUpFormData } from "../schemas/auth.schema";
import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";
import { useToast } from "@/shared/contexts/ToastContext";

export const SignUpScreen = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Sign up data:", data);
      // TODO: Implement actual signup API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful signup
        console.log("Sign up successful");
        // Show success message
        showToast(
          "Account created successfully! Please login with your credentials.",
          "success"
        );
        // Redirect to login page
        setTimeout(() => router.push("/login"), 1000);
      } else {
        // Handle signup error
        console.error("Sign up failed");
        showToast("Sign up failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="auth-container">
      <AuthHeader title="Sign Up" />
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          register={register("name")}
          error={errors.name?.message}
        />

        <AuthFormField
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email?.message}
        />

        <AuthFormField
          name="password"
          label="Create Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password?.message}
          note={
            !errors.password
              ? "Passwords must be at least 8 characters"
              : undefined
          }
        />

        <AuthSubmitButton
          label={isSubmitting ? "Creating Account..." : "Create Account"}
          disabled={isSubmitting}
        />
      </AuthFormWrapper>

      <AuthFooter
        footerText="Already have an account?"
        linkText="Login"
        linkHref="/login"
      />
    </div>
  );
};
