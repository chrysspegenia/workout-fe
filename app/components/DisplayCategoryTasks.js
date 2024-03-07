"use client";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { useApp } from "../context/context";
import { useEffect, useState } from "react";
import CreateTaskButton from "./CreateTaskButton";

const DisplayCategoryTasks = () => {
  const { targetCategory } = useApp();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCategoryTasks();
  }, [targetCategory]);

  const fetchCategoryTasks = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const response = await axios.get(
        `${API_URL}/api/v1/categories/${targetCategory.category_id}/tasks`,
        authorization
      );
      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      {tasks.length == 0 && (
        <div className="lg:p-28 m-10 text-2xl text-center border-2 bg-[rgb(299,299,299)] p-2">
          This category has no tasks. Click this
          <CreateTaskButton></CreateTaskButton>
          button.
        </div>
      )}
      {tasks.length > 0 && (
        <div className="m-10 bg-[rgb(299,299,299)] p-2 mx-1 lg:mx-80 sm:mx-10">
          <span className="ml-10">
            <CreateTaskButton></CreateTaskButton>
          </span>
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {tasks.map((task) => {
              const { attributes } = task;
              return (
                <div
                  key={task.id}
                  className="p-4 border-2 bg-[rgb(20,20,20)] text-white rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer max-w-[20%]"
                  // onClick={() => fetchTargetCategory(task.id)}
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
        </div>
      )}
    </>
  );
};

export default DisplayCategoryTasks;
