"use client"; // Required for using state in Next.js App Router

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart,setCart] = useState([])
  const [activeTab, setActiveTab] = useState("play");
const [clicked, setClicked] = useState(false)
  
    useEffect(() => {
      // Retrieve cart items from localStorage
      const storedCart = JSON.parse(localStorage.getItem('shopping-cart1')) || [];
      setCart(storedCart);
    }, [clicked]); // Update cart when modal opens

  return (
    <AppContext.Provider value={{ user, setUser,clicked,setClicked,cart,setActiveTab,activeTab }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
