"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";
import Navbar from "@/app/components/Navbar";

function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      };

      const response = await axios.get(
        `${API_URL}/api/v1/categories`,
        authorization
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-wrap items-center justify-center h-screen gap-4 mx-1 lg:mx-56 sm:mx-10">
        {categories.map((category) => {
          const { attributes } = category;
          return (
            <div
              key={category.id}
              className="p-4 border-2 bg-[rgb(20,20,20)] text-white w-[20%] h-[30%] rounded-lg overflow-y-auto scrollbar"
            >
              <h2 className="my-2 text-xl text-center">{attributes.title}</h2>
              <div>{attributes.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
