"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import CoffeeCatchupCard from "../_compo/CoffeeCatchupCard";
import CryptoJS from "crypto-js";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const encryptedData = searchParams.get("data");

  const secretKey = "yourSecretKey"; // Same key used for encryption
  let sessionData = null;

  if (encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey);
      sessionData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption error:", error);
    }
  }

  useEffect(() => {
    const handleFetch = async () => {
      if (sessionData) {
        // If session data is available, use it directly
        setProduct(sessionData);
        setLoading(false);
      } else {
        // Otherwise, fetch the data from API
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
      }
    };

    handleFetch();
  }, [id, sessionData]);

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
