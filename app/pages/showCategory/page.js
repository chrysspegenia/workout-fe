"use client";
import { useApp } from "@/app/context/context";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/constants/constants";

const ShowCategoryPage = () => {
  const { targetCategory, setTargetCategory } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // if (!targetCategory.title || !targetCategory.description)
    //   return setErrorMessage("Please fill in all required fields");

    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      };

      const updatedCategoryInfo = {
        title: newTitle,
        description: newDescription,
        image_url: "",
        category_id: targetCategory.category_id,
      };

      const response = await axios.patch(
        `${API_URL}/api/v1/categories/${targetCategory.category_id}`,
        updatedCategoryInfo,
        authorization
      );

      console.log(response);
      setShowForm(false);
    } catch (error) {
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-4">
        {!showForm && (
          <div className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[25%] rounded-lg mx-auto min-h-40">
            <h2 className="my-2 text-3xl text-center text-red-600">
              {!newTitle ? targetCategory.title : newTitle}
            </h2>
            <div className="overflow-y-auto scrollbar max-h-[90%]">
              {!newDescription ? targetCategory.description : newDescription}
            </div>
            <div className="flex justify-around mt-4">
              <button
                className="px-6 py-1 bg-[#e5e5e5] text-black rounded-md hover:text-red-500"
                onClick={() => setShowForm(true)}
              >
                Edit
              </button>
              <button
                className="px-6 py-1 bg-[#e5e5e5] text-black rounded-md hover:text-red-500"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {showForm && (
          <form className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[25%] rounded-lg mx-auto">
            <label htmlFor="title" className="block mb-2 text-gray-100">
              Title
            </label>
            <input
              type="text"
              value={!newTitle ? targetCategory.title : newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-black rounded-md focus:outline-none"
              placeholder={`${targetCategory.title}`}
              required
            ></input>
            <label
              htmlFor="description"
              className="block mt-4 mb-2 text-gray-100"
            >
              Description
            </label>
            <textarea
              type="text"
              value={
                !newDescription ? targetCategory.description : newDescription
              }
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-3 py-2 text-black rounded-md focus:outline-none min-h-40 scrollbar"
              placeholder={`${targetCategory.description}`}
              required
            ></textarea>
            <div className="flex justify-around mt-4">
              <button
                className="px-6 py-1 bg-[#e5e5e5] text-black rounded-md hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-1 bg-[#e5e5e5] text-black rounded-md hover:text-red-500"
                onClick={handleUpdateCategory}
              >
                Update
              </button>
            </div>
            <p className="m-2 text-center text-red-500">{errorMessage}</p>
          </form>
        )}
        {showModal && (
          <div className="flex flex-col gap-4 items-center mx-auto w-96 bg-[rgb(20,20,20)] rounded-lg p-4">
            <span className="text-3xl text-center text-red-500">
              Are you sure?
            </span>
            <div className="flex gap-6">
              <button
                className="px-6 py-1 text-black rounded-md bg-[#e5e5e5] hover:bg-[#ffffff]"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button className="px-6 py-1 text-white bg-red-700 rounded-md hover:bg-red-600">
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowCategoryPage;
