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
  const [isClick, setIsClick] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

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
        const user = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
        };

        localStorage.setItem("key", JSON.stringify(authorization));
        localStorage.setItem("user", JSON.stringify(user));
        console.log("You have successfully logged in");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        router.push("../pages/categories");
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <nav className="bg-black">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              <div className="flex-shrink-0">
                <Link
                  href="../components/login-form"
                  className="text-3xl text-red-600"
                >
                  LOGO
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="items-center ml-4 space-x-4">
                <Link
                  href="../components/login-form"
                  className="p-2 text-white rounded-lg hover:bg-white hover:text-black"
                >
                  Login
                </Link>
                <Link
                  href="../components/signup-form"
                  className="p-2 text-white rounded-lg hover:bg-white hover:text-black"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 text-white rounded:md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="https://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6L12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="https://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="../components/login-form"
                className="block p-2 text-white rounded-lg hover:bg-white hover:text-black"
              >
                Login
              </Link>
              <Link
                href="../components/signup-form"
                className="block p-2 text-white rounded-lg hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="self-center w-full max-w-md px-4 py-8 my-auto bg-white rounded-lg shadow-lg">
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
            href="../components/signup-form"
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
