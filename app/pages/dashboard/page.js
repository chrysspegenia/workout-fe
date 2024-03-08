import CategorySlider from "@/app/components/CategorySlider";
import DisplayCategoryTasks from "@/app/components/DisplayCategoryTasks";
import Navbar from "@/app/components/Navbar";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      <div className="bg-[#e2e2e2]">
        <CategorySlider></CategorySlider>
      </div>
      <div className="bg-[#e2e2e2]">
        <DisplayCategoryTasks></DisplayCategoryTasks>
      </div>
    </div>
  );
}

export default Dashboard;
