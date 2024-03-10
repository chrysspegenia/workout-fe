import { useState, useEffect } from "react";
import { API_URL } from "../constants/constants";
import axios from "axios";
import DeleteTaskButton from "./DeleteTaskButton";
import { useApp } from "../context/context";
import EditTaskForm from "./EditTaskForm";

const DisplayDailyTasks = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { setTargetTask, setIsDailyPage, isDailyPage } = useApp();

  useEffect(() => {
    fetchDailyTasks();
  }, []);

  const fetchDailyTasks = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const response = await axios.get(
        `${API_URL}/api/v1/tasks/due_today`,
        authorization
      );
      setDailyTasks(response.data.data);
      setIsDailyPage(true);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleTaskCompleted = async (task) => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const updateTaskCompletedData = {
        title: task.attributes.title,
        description: task.attributes.description,
        image_url: task.attributes.image_url,
        repetitions: task.attributes.repetitions,
        sets: task.attributes.sets,
        complete: task.attributes.complete,
        category_id: task.attributes.category_id,
        id: task.id,
      };

      const response = await axios.patch(
        `${API_URL}/api/v1/tasks/${task.id}/complete`,
        updateTaskCompletedData,
        authorization
      );

      fetchDailyTasks();
      // console.log(response.data.task);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      {dailyTasks.length === 0 && (
        <div className="lg:p-28 my-5 mx-auto text-2xl text-center border-2 bg-[rgb(299,299,299)] p-2 2xl:w-[60%]">
          You have no tasks scheduled for today.
        </div>
      )}
      {dailyTasks.length > 0 && (
        <div className="m-5 py-5 bg-[rgb(299,299,299)] p-2 max-w-[70%] mx-auto 2xl:w-[60%]">
          <div className="hidden font-bold text-center lg:text-3xl lg:block">
            Daily Tasks
          </div>
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {dailyTasks.map((task) => {
              const { attributes } = task;
              if (editingTaskId === task.id) {
                return (
                  <EditTaskForm
                    key={task.id}
                    task={task}
                    setEditingTaskId={setEditingTaskId}
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    fetchDailyTasks={fetchDailyTasks}
                  ></EditTaskForm>
                );
              } else {
                return (
                  <div
                    key={task.id}
                    className="px-6 py-2 border-2 bg-[rgb(20,20,20)] text-white rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer flex flex-wrap items-center justify-between w-[90%]"
                  >
                    <h2 className="my-2 text-xl text-center text-red-600 xl:w-[50%] lg:w-full">
                      {attributes.title}
                    </h2>
                    {/* <div className="overflow-y-auto scrollbar max-h-[90%]">
                    {attributes.description}
                  </div> */}
                    <button
                      className={`px-6 py-1 text-white rounded-md ${
                        attributes.completed ? "bg-green-500" : "bg-yellow-500"
                      }`}
                      onClick={() => handleTaskCompleted(task)}
                    >
                      {attributes.completed ? "Completed" : "In Progress"}
                    </button>
                    <button
                      className="px-6 py-1 text-black rounded-md bg-[#e5e5e5] hover:bg-[#ffffff]"
                      onClick={() => {
                        setTargetTask({ title: attributes.title });
                        setEditingTaskId(task.id);
                      }}
                    >
                      Edit
                    </button>
                    <DeleteTaskButton
                      taskId={task.id}
                      fetchDailyTasks={fetchDailyTasks}
                    ></DeleteTaskButton>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayDailyTasks;
