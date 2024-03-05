"use client";
import { useApp } from "@/app/context/context";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

const ShowCategoryPage = () => {
  const { targetCategory } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-4">
        <div className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[20%] rounded-lg mx-auto">
          <h2 className="my-2 text-3xl text-center text-red-600">
            {targetCategory.title}
          </h2>
          <div className="overflow-y-auto scrollbar max-h-[90%]">
            {targetCategory.description}
          </div>
          <div className="flex justify-around mt-4">
            <button className="px-6 py-1 bg-[#e5e5e5] text-black rounded-md hover:text-red-500">
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
