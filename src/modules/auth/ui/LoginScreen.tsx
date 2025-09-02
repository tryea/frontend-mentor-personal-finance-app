"use client";

import AuthFooter from "./components/AuthFooter";
import AuthFormField from "./components/AuthFormField";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthHeader from "./components/AuthHeader";
import AuthSubmitButton from "./components/AuthSubmitButton";

export const LoginScreen = () => {
  return (
    <div className="login-container">
      <AuthHeader title="Login" />
      <AuthFormWrapper>
        <AuthFormField
          label="Email"
          type="text"
          placeholder="Enter your email"
        />
        <AuthFormField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </AuthFormWrapper>

      <AuthSubmitButton label="Login" />

      <AuthFooter
        footerText="Need to create an account?"
        linkText="Sign Up"
        linkHref="/signup"
      />
    </div>
  );
};
