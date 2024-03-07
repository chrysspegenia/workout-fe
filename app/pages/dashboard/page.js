import CategorySlider from "@/app/components/CategorySlider";
import Navbar from "@/app/components/Navbar";
import TasksDisplay from "@/app/components/TasksDisplay";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      <div className="bg-[#e2e2e2]">
        <CategorySlider></CategorySlider>
      </div>
      <div className="bg-[#e2e2e2]">
        <TasksDisplay></TasksDisplay>
      </div>
    </div>
  );
}

export default Dashboard;
