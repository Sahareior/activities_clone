"use client";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FaCartPlus, FaWhatsapp } from "react-icons/fa";
import { addToDb } from "@/app/tools/tools";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { Spin } from "antd";
import { useAppContext } from "@/app/context/AppContext";
import Review from "./Review";
import Image from "next/image";
import OtherItems from "./OtherItems";

const CoffeeCatchupCard = ({ product,setProduct }) => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { clicked, setClicked, navigated } = useAppContext();
  const [item, setItem] = useState(product);

  useEffect(() => {

    setLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }


  const addToCart = (data) => {
    addToDb(data);
    setClicked(!clicked);
  };

  return (
    <div className="bg-[#FBFBFB] md:max-w-5xl mx-auto p-3 md:p-8 rounded-lg ">
       <SnackbarProvider />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.img}
            alt={product.title}
            width={600}
            height={400}
            className="w-full rounded-lg object-cover max-h-[600px]"
            placeholder="blur"
            blurDataURL={product.img}
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-2xl font-semibold text-red-400">
            {product.price} TK
            <span className="text-sm text-gray-500"> (Incl. VAT)</span>
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
              <button
                className="text-xl px-3 font-bold hover:text-red-600"
                onClick={decreaseQty}
              >
                −
              </button>
              <span className="px-4 text-lg font-medium">{quantity}</span>
              <button
                className="text-xl px-3 font-bold hover:text-green-600"
                onClick={increaseQty}
              >
                +
              </button>
            </div> */}
         <Button
  onClick={() => {
    addToCart(item);
    enqueueSnackbar("Item has been added to the cart", {
      variant: "success", // success, error, warning, info
      anchorOrigin: { vertical: "top", horizontal: "right" }, // Position
      autoHideDuration: 3000, // Hide after 3 seconds
      style: { backgroundColor: "#1e293b", color: "#ffffff", fontSize: "16px", fontWeight: "bold" },
    });
  }}
  type="primary"
     className="w-full md:w-[200px] rounded-full bg-orange-400 text-white h-12 flex items-center justify-center gap-3 hover:bg-green-600 transition-all"
>
 <FaCartPlus /> Add to Cart
</Button>

          </div>

          {/* WhatsApp Chat Button */}
          <Button
            className="w-full md:w-[200px] rounded-full bg-green-500 text-white h-12 flex items-center justify-center gap-3 hover:bg-green-600 transition-all"
            type="default"
            onClick={() => window.open("https://wa.me/8801726369220", "_blank")}
          >
            <FaWhatsapp className="w-6 h-6" />
            <span className="text-base font-semibold">Chat to Shop</span>
          </Button>

          {/* Description */}
          <div className="space-y-3 mt-3">
            <p className="text-gray-600 text-sm">
              Connect with other new moms in a relaxed & informal setting while babies play.
            </p>
            <p className="text-gray-600 text-sm">
              Price includes 3 hours of play, your choice of a drink, and professional support.
            </p>
            <p className="text-gray-600 text-sm">
              Flexi drop-in time—come whenever suits you best.
            </p>
            <p className="text-gray-600 text-sm">
              Ideal for babies from newborn to 1 year old.
            </p>
          </div>
        </div>
      </div>

      <Review />

      <OtherItems setProduct={setProduct} />
    </div>
  );
};

export default CoffeeCatchupCard;
