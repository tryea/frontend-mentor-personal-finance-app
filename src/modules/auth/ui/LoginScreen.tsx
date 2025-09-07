"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useToast } from "@/shared/contexts/ToastContext";
import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";
import { useRouter } from "next/navigation";

export const LoginScreen = () => {
  const { showToast } = useToast();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        showToast("Login successful!", "success");
        router.push("/");
      } else {
        // Handle other statuses if needed
        console.log("Login result:", result);
      }
    } catch (error: any) {
      showToast(
        error?.errors?.[0]?.message ||
          "Login failed. Please check your credentials and try again.",
        "error"
      );
    }
  };

  return (
    <div className="auth-container">
      <AuthHeader title="Login" />

      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField
          key="email"
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email?.message}
        />
        <AuthFormField
          key="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password?.message}
        />

        <AuthSubmitButton
          label={isSubmitting ? "Logging in..." : "Login"}
          disabled={isSubmitting}
        />
      </AuthFormWrapper>

      <AuthFooter
        footerText="Need to create an account?"
        linkText="Sign Up"
        linkHref="/signup"
      />
    </div>
  );
};
