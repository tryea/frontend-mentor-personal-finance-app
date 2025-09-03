"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useToast } from "@/shared/contexts/ToastContext";
import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";
import { login } from "../actions";

export const LoginScreen = () => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      await login(formData);
      showToast("Login successful!", "success");
    } catch (error) {
      showToast(
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
