"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";

function CategorySlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center gap-2 p-2 mx-1 mt-4 overflow-x-auto border-2 lg:mx-80 sm:mx-10 bg-[rgb(299,299,299)] scrollbar">
      {categories.map((category) => {
        const { attributes } = category;
        return (
          <div
            key={category.id}
            className="px-2 py-1 text-center border-2 bg-[rgb(20,20,20)] text-white"
          >
            <div className="my-2">{attributes.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CategorySlider;
