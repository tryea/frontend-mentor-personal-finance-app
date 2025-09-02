"use client";

import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";

export const SignUpScreen = () => {
  return (
    <div className="login-container">
      <AuthHeader title="Sign Up" />
      <AuthFormWrapper>
        <AuthFormField label="Name" type="text" placeholder="Enter your name" />
        <AuthFormField
          label="Email"
          type="text"
          placeholder="Enter your email"
        />
        <AuthFormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          note="Passwords must be at least 8 characters"
        />
      </AuthFormWrapper>

      <AuthSubmitButton label="Create Account" />

      <AuthFooter
        footerText="Already have an account?"
        linkText="Login"
        linkHref="/login"
      />
    </div>
  );
};
