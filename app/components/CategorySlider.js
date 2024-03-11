"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";
import { useApp } from "../context/context";

function CategorySlider(props) {
  const { setTargetCategory, dailyTasksCount, updateCategoryTaskCount } =
    useApp();
  const [categories, setCategories] = useState([]);
  const [editCategoryBgId, setEditCategoryBgId] = useState(null);
  const { setShowDailyTasks } = props;

  useEffect(() => {
    fetchCategories();
  }, [updateCategoryTaskCount]);

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
    setShowDailyTasks(false);
    setTargetCategory({
      title: category.attributes.title,
      // description: category.attributes.description,
      description: "",
      category_id: category.id,
    });

    setEditCategoryBgId(category.id);
  };

  const handleClickToday = () => {
    setEditCategoryBgId("today");
    setShowDailyTasks(true);
  };

  return (
    <div
      className={`flex gap-2 p-2 mx-1 mt-4 overflow-x-auto xl:mx-80 sm:mx-10 bg-[rgb(299,299,299)] scrollbar 
      ${categories.length < 7 ? "xl:justify-center" : null}`}
    >
      <div
        className={`${
          editCategoryBgId === "today"
            ? "bg-red-600 hover:text-black"
            : "bg-[rgb(20,20,20)] hover:text-red-600"
        } relative px-4 py-3 text-center text-white flex-shrink-0 cursor-pointer flex items-center
            `}
        onClick={handleClickToday}
      >
        <div>Daily Tasks</div>
        <div
          className={`${
            editCategoryBgId === "today" ? "bg-[rgb(20,20,20)]" : "bg-red-500"
          } absolute -top-2 w-7 h-7 rounded-full -right-1.5 grid items-center text-white`}
        >
          {dailyTasksCount}
        </div>
      </div>
      {categories.map((category) => {
        const { attributes } = category;
        return (
          <div
            key={category.id}
            className={`${
              editCategoryBgId === category.id
                ? "bg-red-600 hover:text-black"
                : "bg-[rgb(20,20,20)] hover:text-red-600"
            } relative px-4 py-1 text-center text-white flex-shrink-0 cursor-pointer
            `}
            onClick={() => handleClickTarget(category)}
          >
            <div className="my-2">{attributes.title}</div>
            <span
              className={`${
                editCategoryBgId === category.id
                  ? "bg-[rgb(20,20,20)]"
                  : "bg-red-500"
              }
            absolute -top-2 w-7 h-7 rounded-full -right-1.5 grid items-center text-white`}
            >
              {category.relationships.tasks.data.length}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default CategorySlider;
