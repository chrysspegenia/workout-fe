import { API_URL } from "../constants/constants";
import axios from "axios";
import { useApp } from "../context/context";

const DeleteTaskButton = (props) => {
  const { taskId, fetchCategoryTasks, fetchDailyTasks } = props;
  const { isDailyPage, updateCategoryTaskCount, setUpdateCategoryTaskCount } =
    useApp();

  const handleDeleteTask = async () => {
    try {
      const authorization = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("key")),
        },
      };

      const response = await axios.delete(
        `${API_URL}/api/v1/tasks/${taskId}`,
        authorization
      );

      console.log(response);
      isDailyPage ? fetchDailyTasks() : fetchCategoryTasks();
      setUpdateCategoryTaskCount(!updateCategoryTaskCount);
    } catch (error) {
      console.log("Something went wrong. Try again.");
    }
  };

  return (
    <button
      className="px-6 py-1 text-black rounded-md bg-[#e5e5e5] hover:bg-red-500 hover:text-white"
      onClick={handleDeleteTask}
    >
      Delete
    </button>
  );
};

export default DeleteTaskButton;
