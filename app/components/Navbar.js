"use client";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./logout-btn/page";

function Navbar() {
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  //This code first checks if window is defined (ensuring it's running in the browser environment)
  //and if localStorage.getItem("user") returns a truthy value. If both conditions are met, it
  //parses the JSON data from localStorage. Otherwise, it sets userInfo to null.
  const userInfo =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <nav className="bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div className="flex-shrink-0">
              <Link href="../pages/dashboard" className="text-3xl text-red-600">
                LOGO
              </Link>
            </div>
            {userInfo && (
              <div className="hidden text-xl text-white md:block">
                Welcome, {userInfo.name}.
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="items-center ml-4 space-x-4">
              <Link
                href="../pages/categories"
                className="p-2 text-white rounded-lg hover:bg-white hover:text-black"
              >
                Home
              </Link>
              <Link
                href="../pages/dashboard"
                className="p-2 text-white rounded-lg hover:bg-white hover:text-black"
              >
                Dashboard
              </Link>
              {/* <Link
                href="../pages/dashboard"
                className="p-2 text-white rounded-lg hover:bg-white hover:text-black"
              >
                Tasks
              </Link> */}
              <LogoutButton></LogoutButton>
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
              href="../pages/categories"
              className="block p-2 text-white rounded-lg hover:bg-white hover:text-black"
            >
              Home
            </Link>
            <Link
              href="../pages/dashboard"
              className="block p-2 text-white rounded-lg hover:bg-white hover:text-black"
            >
              Dashbaord
            </Link>
            {/* <Link
              href="../pages/dashboard"
              className="block p-2 text-white rounded-lg hover:bg-white hover:text-black"
            >
              Tasks
            </Link> */}
            <LogoutButton></LogoutButton>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
