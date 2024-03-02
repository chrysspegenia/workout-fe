"use client";
import React from "react";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${API_URL}/logout`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      });
      localStorage.clear();
      router.push("/");
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-center text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
