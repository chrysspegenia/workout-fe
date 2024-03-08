import { useApp } from "../context/context";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { useEffect } from "react";

const EditTaskForm = (props) => {
  const {
    task,
    setEditingTaskId,
    newTaskTitle,
    setNewTaskTitle,
    fetchCategoryTasks,
  } = props;
  const { targetTask, setTargetTask, targetCategory } = useApp();

  useEffect(() => {
    setNewTaskTitle(targetTask.title);
  }, [targetTask]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const updatedTaskInfo = {
        title: !newTaskTitle ? targetTask.title : newTaskTitle,
        // description: !newDescription
        //   ? targetCategory.description
        //   : newDescription,
        description: "",
        image_url: "",
        category_id: targetCategory.category_id,
        repetitions: "",
        sets: "",
        completed: task.attributes.completed,
        task_id: "",
      };

      const response = await axios.patch(
        `${API_URL}/api/v1/tasks/${task.id}`,
        updatedTaskInfo,
        authorization
      );

      setTargetTask(updatedTaskInfo);
      setEditingTaskId(null);
      fetchCategoryTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelTaskEdit = () => {
    setEditingTaskId(null);
    setNewTaskTitle(targetTask.title);
  };

  return (
    <div className="px-6 py-2 border-2 bg-[rgb(20,20,20)] text-white rounded-lg hover:bg-[rgb(40,40,40)] hover:cursor-pointer flex flex-wrap items-center justify-around w-[90%]">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="w-1/2 px-3 py-2 text-black rounded-md focus:outline-none"
        required
      ></input>

      <div className="flex gap-10">
        <button
          className="px-6 py-1 text-black rounded-md bg-[#e5e5e5] hover:bg-[#ffffff]"
          onClick={handleCancelTaskEdit}
        >
          Cancel
        </button>
        <button
          className="px-6 py-1 text-black rounded-md bg-[#e5e5e5] hover:bg-[#ffffff]"
          onClick={handleUpdateTask}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
