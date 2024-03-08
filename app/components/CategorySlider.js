"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";
import { useApp } from "../context/context";

function CategorySlider() {
  const { setTargetCategory } = useApp();
  const [categories, setCategories] = useState([]);
  const [editCategoryBgId, seteditCategoryBgId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
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

  const handleClickTarget = (category) => {
    setTargetCategory({
      title: category.attributes.title,
      // description: category.attributes.description,
      description: "",
      category_id: category.id,
    });

    seteditCategoryBgId(category.id);
  };

  return (
    !categories && (
      <div className="flex gap-2 p-2 mx-1 mt-4 overflow-x-auto lg:mx-80 sm:mx-10 bg-[rgb(299,299,299)] scrollbar 2xl:justify-center">
        {categories.map((category) => {
          const { attributes } = category;
          return (
            <div
              key={category.id}
              className={`${
                editCategoryBgId === category.id
                  ? "bg-red-600 hover:text-black"
                  : "bg-[rgb(20,20,20)] hover:text-red-600"
              } px-4 py-1 text-center text-white flex-shrink-0 cursor-pointer
            `}
              onClick={() => handleClickTarget(category)}
            >
              <div className="my-2">{attributes.title}</div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default CategorySlider;
