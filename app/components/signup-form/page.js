"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/app/constants/constants";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword)
      return setErrorMessage("Please fill in all required fields.");

    if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email))
      return setErrorMessage("Please enter a valid email.");

    if (password !== confirmPassword)
      return setErrorMessage("Your passwords do not match.");

    try {
      const registrationCredentials = {
        user: {
          email: email,
          password: password,
          name: name,
        },
      };

      const response = await axios.post(
        `${API_URL}/signup`,
        registrationCredentials
      );
      setErrorMessage(response.data.status.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.response.data.status.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <p
          className={`m-2 text-center ${
            !errorMessage.includes("successfully")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {errorMessage}
        </p>
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="./login-form"
            className="text-blue-500 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
