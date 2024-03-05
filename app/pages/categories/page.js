"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";
import Navbar from "@/app/components/Navbar";
import { useApp } from "@/app/context/context";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const { setTargetCategory } = useApp();
  const router = useRouter();

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

  const fetchTargetCategory = async (id) => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      };

      const response = await axios.get(
        `${API_URL}/api/v1/categories/${id}`,
        authorization
      );

      const { data } = response;

      setTargetCategory({
        title: data.data.attributes.title,
        description: data.data.attributes.description,
        image_url: data.data.attributes.image_url,
        category_id: data.data.id,
      });
      router.push("../pages/showCategory");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-wrap items-center justify-center h-screen gap-4 mx-1 mt-4 lg:mx-56 sm:mx-10">
        {categories.map((category) => {
          const { attributes } = category;
          return (
            <div
              key={category.id}
              className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[20%] rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer min-w-96"
              onClick={() => fetchTargetCategory(category.id)}
            >
              <h2 className="my-2 text-xl text-center text-red-600">
                {attributes.title}
              </h2>
              <div className="overflow-y-auto scrollbar max-h-[90%]">
                {attributes.description}
              </div>
              <div className="p-2 text-center">Click for more info</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
