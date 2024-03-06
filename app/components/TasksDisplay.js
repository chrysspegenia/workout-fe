"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/constants";

function TasksDisplay() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const response = await axios.get(
        `${API_URL}/api/v1/tasks`,
        authorization
      );
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 mx-1 lg:mx-80 sm:mx-10 bg-[rgb(299,299,299)] p-4 mt-4">
        {tasks.map((task) => {
          const { attributes } = task;
          return (
            <div
              key={task.id}
              className="p-4 border-2 bg-[rgb(20,20,20)] text-white lg:w-[20%] rounded-lg"
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

export default TasksDisplay;
