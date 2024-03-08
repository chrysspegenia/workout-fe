"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";
import Navbar from "@/app/components/Navbar";
import { useApp } from "@/app/context/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const fetchTargetCategory = async (id) => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
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
      <div className="flex items-center justify-between w-2/3 px-10 mx-auto mt-4">
        <span className="hidden font-bold xl:text-5xl lg:text-3xl lg:block">
          Categories
        </span>
        {categories.length !== 0 && (
          <Link href="../pages/createCategory">
            <button className="px-6 py-2 text-white bg-[rgb(20,20,20)] rounded-md hover:text-red-500">
              Create a Category
            </button>
          </Link>
        )}
      </div>
      {categories.length === 0 && (
        <div className="lg:p-28 my-10 mx-auto text-2xl text-center border-2 bg-[rgb(299,299,299)] p-2 2xl:w-[60%]">
          It would seem you have no categories at this time.
          <div>To get started click this</div>
          <Link href="../pages/createCategory">
            <button className="mt-2 px-6 py-2 text-white bg-[rgb(20,20,20)] rounded-md hover:text-red-500">
              Create a Category
            </button>
          </Link>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 mx-1 mt-4 items:center lg:mx-56 sm:mx-10">
        {categories.map((category) => {
          const { attributes } = category;
          return (
            <div
              key={category.id}
              className="p-4 border-2 bg-[rgb(20,20,20)] text-white rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer lg:max-w-[47%] w-full md:w-[75%] xl:max-w-[20%] relative"
              onClick={() => fetchTargetCategory(category.id)}
            >
              <h2 className="my-2 text-xl text-center text-red-600">
                {attributes.title}
              </h2>
              <div
                className={`overflow-y-auto scrollbar max-h-[20em] mb-5 lg:mb-10 ${
                  attributes.description.length < 40
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {attributes.description}
              </div>
              <div className="absolute bottom-0 p-2 text-center">
                Click card for more info
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
