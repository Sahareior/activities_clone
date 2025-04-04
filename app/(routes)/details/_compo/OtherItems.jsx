"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import ProductCard from "./Card";

const OtherItems = ({ handleClick,setProduct,cat }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://server-sijans-projects-f3bcab8f.vercel.app/allproducts"
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Ensure loading is false whether the request succeeds or fails
      }
    };

    fetchData();
  }, []); // Run once when component mounts

let updatedData;
  // const updatedData = data.filter(items => items.category === '3-piece')
  if (cat === '3-piece'){
    updatedData = data.filter(items => items.category === '3-piece')
  }
  if( cat === 'jeans'){
    updatedData = data.filter(items => items.category === 'jeans')
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="md:p-6 mt-4 md:max-w-5xl mx-auto">
      <h2 className="text-xl mx-4 text-black font-bold my-5">View other items</h2>

      <div className="md:grid grid-cols-6 px-1 gap-3 md:overflow-x-auto">
        {updatedData.map((product) => (
          <ProductCard key={product.id} handleClick={handleClick} setProduct={setProduct} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtherItems;
