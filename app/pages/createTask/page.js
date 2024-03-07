"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { API_URL } from "@/app/constants/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/app/context/context";

const CreateCategoryForm = () => {
  const { targetCategory } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title || !description)
      return setErrorMessage("Please fill in all required fields.");

    try {
      const newTaskData = {
        title: title,
        description: description,
        image_url: "",
        repetitions: "",
        sets: "",
        completed: false,
        category_id: targetCategory.category_id,
      };

      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const response = await axios.post(
        `${API_URL}/api/v1/tasks`,
        newTaskData,
        authorization
      );

      console.log(response);
      setTitle("");
      setDescription("");
      setErrorMessage("");
      router.back();
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <h1 className="mt-10 mb-5 text-3xl text-center">
        Creating a task for {targetCategory.title}
      </h1>
      <form className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[25%] rounded-lg mx-auto relative">
        <label htmlFor="title" className="block mb-2 text-gray-100">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-black rounded-md focus:outline-none"
          required
        ></input>
        <label htmlFor="description" className="block mt-4 mb-2 text-gray-100">
          Description
        </label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-black rounded-md focus:outline-none min-h-40 scrollbar"
          required
        ></textarea>

        <div className="flex justify-around">
          <Link href="../pages/categories">
            <button className="px-6 py-1  mt-2 bg-[#e5e5e5] text-black rounded-md hover:text-red-500 hover:bg-[#ffffff]">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-1  mt-2 bg-[#e5e5e5] text-black rounded-md hover:text-red-500 hover:bg-[#ffffff]"
            onClick={handleCreateTask}
          >
            Submit
          </button>
        </div>

        <p className="m-2 text-center text-red-500">{errorMessage}</p>
      </form>
    </>
  );
};

export default CreateCategoryForm;
