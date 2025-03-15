"use client"; // Required for using state in Next.js App Router

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("play");
  const [clicked, setClicked] = useState(false);
  const [navigated, setNavigated] = useState(() => {
    if (typeof window !== "undefined") {
      const storedNavigated = localStorage.getItem("navigated-data");
      return storedNavigated ? JSON.parse(storedNavigated) : {};
    }
    return {};
  });
  

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart1")) || [];
    setCart(storedCart);
  }, [clicked]); // Update cart when modal opens

  // Persist `navigated` state in localStorage
  useEffect(() => {
    const storedNavigated = localStorage.getItem("navigated-data");
    if (storedNavigated) {
      setNavigated(JSON.parse(storedNavigated));
    }
  }, []);

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      cart, setCart, 
      activeTab, setActiveTab, 
      clicked, setClicked, 
      navigated, setNavigated 
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
