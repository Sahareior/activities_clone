"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import CoffeeCatchupCard from "../_compo/CoffeeCatchupCard";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          "https://server-sijans-projects-f3bcab8f.vercel.app/allproducts"
        );

        // Find the product that matches the ID
        const foundProduct = response.data.find((item) => item._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, [id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }
  
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <CoffeeCatchupCard product={product} />
    </div>
  );
};

export default Page;
