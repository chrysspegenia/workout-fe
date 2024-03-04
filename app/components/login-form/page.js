"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/app/constants/constants";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/context/context";

const LoginForm = () => {
  const { setUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password)
      return setErrorMessage("Please fill in all required fields.");

    if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email))
      return setErrorMessage("Please enter a valid email.");

    try {
      const loginCredentials = {
        user: {
          email: email,
          password: password,
        },
      };

      const response = await axios.post(`${API_URL}/login`, loginCredentials);
      const { data, headers } = response;
      if (data && headers) {
        setUser({
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
        });

        const authorization = headers["authorization"];

        localStorage.setItem("user", JSON.stringify(authorization));
        console.log("You have successfully logged in");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        router.push("../pages/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            ></input>
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
              placeholder="Password"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="m-2 text-center text-red-500">{errorMessage}</p>
        <p className="mt-4 text-center text-gray-700">
          Dont have an account?{" "}
          <Link
            href="./signup-form"
            className="text-blue-500 hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
