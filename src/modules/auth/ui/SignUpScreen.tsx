"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { signUpSchema, type SignUpFormData } from "../schemas/auth.schema";
import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";
import { useToast } from "@/shared/contexts/ToastContext";

export const SignUpScreen = () => {
  const { showToast } = useToast();
  const { signUp, setActive, isLoaded } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name.split(" ")[0] || data.name,
        lastName: data.name.split(" ").slice(1).join(" ") || undefined,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        showToast("Account created successfully!", "success");
      } else if (result.status === "missing_requirements") {
        // Handle email verification if required
        showToast("Please check your email to verify your account.", "info");
      } else {
        console.log("Sign up result:", result);
      }
    } catch (error: any) {
      showToast(
        error?.errors?.[0]?.message || "Sign up failed. Please try again.",
        "error"
      );
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

        <div id="clerk-captcha" />

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
