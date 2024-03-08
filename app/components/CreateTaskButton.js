import Link from "next/link";

const CreateTaskButton = () => {
  return (
    <Link href="../pages/createTask">
      <button className="px-6 py-2 text-white bg-[rgb(20,20,20)] rounded-md hover:text-red-500 mx-1">
        Create a task
      </button>
    </Link>
  );
};

export default CreateTaskButton;
