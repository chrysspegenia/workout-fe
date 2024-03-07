"use client";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { useApp } from "../context/context";
import { useEffect, useState } from "react";
import CreateTaskButton from "./CreateTaskButton";

const DisplayCategoryTasks = () => {
  const { targetCategory, targetTask, setTargetTask } = useApp();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCategoryTasks();
  }, []);

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
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSetTargetTask = (task) => {
    // console.log(task);
    setTargetTask({
      title: task.attributes.title,
      description: task.attributes.description,
      image_url: task.attributes.image_url,
      repetitions: task.attributes.repetitions,
      sets: task.attributes.sets,
      complete: task.attributes.completed,
      category_id: task.attributes.category_id,
      task_id: task.id,
    });
  };

  const handleTaskCompleted = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const updateTaskCompletedData = {
        title: targetTask.title,
        description: targetTask.description,
        image_url: targetTask.image_url,
        repetitions: targetTask.repetitions,
        sets: targetTask.sets,
        complete: targetTask.complete,
        category_id: targetTask.category_id,
        id: targetTask.id,
      };

      const response = await axios.patch(
        `${API_URL}/api/v1/tasks/${targetTask.task_id}/complete`,
        updateTaskCompletedData,
        authorization
      );

      fetchCategoryTasks();
      // console.log(response.data.task);
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
        <div className="m-10 py-5 bg-[rgb(299,299,299)] p-2 mx-1 lg:mx-80 sm:mx-10">
          <span className="ml-10">
            <CreateTaskButton></CreateTaskButton>
          </span>
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {tasks.map((task) => {
              const { attributes } = task;
              return (
                <div
                  key={task.id}
                  className="p-4 border-2 bg-[rgb(20,20,20)] text-white rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer w-[20%]"
                >
                  <h2 className="my-2 text-xl text-center text-red-600">
                    {attributes.title}
                  </h2>
                  <div className="overflow-y-auto scrollbar max-h-[90%]">
                    {attributes.description}
                  </div>
                  <button
                    className={`px-6 py-1 text-white rounded-md ${
                      attributes.completed ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    onMouseOver={() => handleSetTargetTask(task)}
                    onClick={handleTaskCompleted}
                  >
                    {attributes.completed ? "Completed" : "In Progress"}
                  </button>
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
