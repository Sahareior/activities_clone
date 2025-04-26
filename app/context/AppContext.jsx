"use client"; // Required for using state in Next.js App Router

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("3-piece");
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true)
  const [navigated, setNavigated] = useState(() => {
    if (typeof window !== "undefined") {
      const storedNavigated = localStorage.getItem("navigated-data");
      return storedNavigated ? JSON.parse(storedNavigated) : {};
    }
    return {};
  });

  const handleFetch = async () => {
    try {
      const response = await axios.get("https://server-sijans-projects-f3bcab8f.vercel.app/allproducts");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false); // Ensure loading is turned off after API call completes (success or fail)
    }
  };
  
  useEffect(() => {
    handleFetch();
  }, []);
  

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
      navigated, setNavigated,
      data,setData,loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
