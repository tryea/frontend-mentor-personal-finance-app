"use client";
import React, { useState } from "react";
import { LoginFormField } from "./LoginFormField";
import { LoginButton } from "./LoginButton";
import { authService, type LoginRequest } from "../../services/authService";

export type LoginPayload = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    setError("");
    setSuccess(false);
    
    try {
      const loginData: LoginRequest = {
        email: email.trim(),
        password,
      };
      
      const response = await authService.login(loginData);
      
      if (response.success) {
        setSuccess(true);
        // Reset form on success
        setEmail("");
        setPassword("");
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
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
        
        {error && (
          <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-preset-5 text-red-600">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-preset-5 text-green-600">Login successful! Redirecting...</p>
          </div>
        )}
        
        <LoginButton
          isValid={isValid}
          isLoading={isLoading}
          text="Login"
        />
      </form>
    </div>
  );
};