"use client";
import React, { useState } from "react";
import { SignUpFormField } from "./SignUpFormField";
import { SignUpButton } from "./SignUpButton";

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = name.trim().length > 0 && 
                  email.trim().length > 0 && 
                  password.trim().length >= 8 && 
                  isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Implement actual sign up logic
      console.log("Sign up attempt:", { name, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-header">
        <h1 className="text-preset-1 text-grey-900">Sign Up</h1>
        <p className="text-preset-4 text-grey-500">Create your account to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <SignUpFormField
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
          required
        />
        
        <SignUpFormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          required
        />
        
        <SignUpFormField
          label="Create Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Passwords must be at least 8 characters"
          required
        />
        
        <SignUpButton
          isValid={isValid}
          isLoading={isLoading}
          text="Create Account"
        />
        
        <div className="text-center">
          <span className="text-preset-4 text-grey-500">Already have an account? </span>
          <a href="/login" className="text-preset-4-bold text-grey-900 underline">Login</a>
        </div>
      </form>
    </div>
  );
};