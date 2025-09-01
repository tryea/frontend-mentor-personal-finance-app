"use client";
import React, { useState } from "react";
import { LoginFormField } from "./LoginFormField";
import { LoginButton } from "./LoginButton";

export type LoginPayload = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = email.trim().length > 0 && 
                  password.trim().length > 0 && 
                  isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Implement actual login logic
      console.log("Login attempt:", { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-header">
        <h1 className="text-preset-1 text-grey-900">Login</h1>
        <p className="text-preset-4 text-grey-500">Please sign in to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <LoginFormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          required
        />
        
        <LoginFormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          required
        />
        
        <LoginButton
          isValid={isValid}
          isLoading={isLoading}
          text="Login"
        />
      </form>
    </div>
  );
};