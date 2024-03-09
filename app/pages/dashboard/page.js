"use client";
import CategorySlider from "@/app/components/CategorySlider";
import DisplayCategoryTasks from "@/app/components/DisplayCategoryTasks";
import DisplayDailyTasks from "@/app/components/DisplayDailyTasks";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

function Dashboard() {
  const [showDailyTasks, setShowDailyTasks] = useState(true);
  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      <div>
        <CategorySlider setShowDailyTasks={setShowDailyTasks}></CategorySlider>
      </div>
      <div>
        {showDailyTasks && <DisplayDailyTasks></DisplayDailyTasks>}
        {!showDailyTasks && <DisplayCategoryTasks></DisplayCategoryTasks>}
      </div>
    </div>
  );
}

export default Dashboard;
