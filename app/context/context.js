"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    id: "id",
    email: "user@email.com",
    name: "User",
  });

  const [targetCategory, setTargetCategory] = useState({
    title: "Title",
    description: "Description",
    image_url: "",
    category_id: "",
  });

  return (
    <AppContext.Provider
      value={{ user, setUser, targetCategory, setTargetCategory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
