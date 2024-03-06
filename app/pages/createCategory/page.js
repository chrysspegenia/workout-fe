"use client";
import { useReducer, useState } from "react";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { API_URL } from "@/app/constants/constants";
import { useRouter } from "next/navigation";

const CreateCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!title || !description)
      return setErrorMessage("Please fill in all required fields.");

    try {
      const newCategorydata = {
        title: title,
        description: description,
        image_url: "",
      };

      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      };

      const response = await axios.post(
        `${API_URL}/api/v1/categories`,
        newCategorydata,
        authorization
      );

      console.log(response);
      setTitle("");
      setDescription("");
      setErrorMessage("");
      router.push("../pages/categories");
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  return (
    <>
      <Navbar></Navbar>
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

        <button
          type="submit"
          className="px-6 py-1  mt-2 bg-[#e5e5e5] text-black rounded-md hover:text-red-500 right-1"
          onClick={handleCreateCategory}
        >
          Submit
        </button>

        <p className="m-2 text-center text-red-500">{errorMessage}</p>
      </form>
    </>
  );
};

export default CreateCategoryForm;
