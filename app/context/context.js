"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    id: "id",
    email: "user@email.com",
    name: "User",
  });

  const [targetCategory, setTargetCategory] = useState({
    title: "Category Title",
    description: "Description",
    image_url: "",
    category_id: "",
  });

  const [targetTask, setTargetTask] = useState({
    title: "Task Title",
    description: "Task Description",
    image_url: "",
    repetitions: "",
    sets: "",
    completed: false,
    category_id: targetCategory.category_id,
    task_id: "",
    due_date: "",
  });

  const [isDailyPage, setIsDailyPage] = useState(true);

  const [dailyTasksCount, setDailyTasksCount] = useState(0);

  const [updateCategoryTaskCount, setUpdateCategoryTaskCount] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        targetCategory,
        setTargetCategory,
        targetTask,
        setTargetTask,
        isDailyPage,
        setIsDailyPage,
        dailyTasksCount,
        setDailyTasksCount,
        updateCategoryTaskCount,
        setUpdateCategoryTaskCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
