"use client"
import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined, MessageOutlined } from "@ant-design/icons";
import { 
    FaFacebook,
    FaChevronDown, 
    FaInstagram, 
    FaInternetExplorer, 
    FaTwitter, 
    FaWhatsapp 
  } from "react-icons/fa";
import OtherItems from "./OtherItems";
import { addToDb } from "@/app/tools/tools";
import { useAppContext } from "@/app/context/AppContext";
import Review from "./Review";



const CoffeeCatchupCard = () => {
    const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
     const {clicked,setClicked} = useAppContext()
  const [item, setItem] = useState(  {
    id: 1,
    name: "Round Play Mat for Baby Gym and Room",
    price: 150.0,
    image: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F96E2D9F9-6D42-4DDB-BDC3-75DBF010F11B.jpg&w=384&q=75",
  }); // Corrected syntax
  useEffect(()=>{
    setLoading(false)
  },[])
  if(loading){
    return(
      <p>Loading...</p>
    )
  }
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

const handleClick = (data) =>{
    setItem(data)
}

const addToCart=(data)=>{
  addToDb(data)
  setClicked(!clicked)
}

console.log(item)
  return (
<div className="bg-[#FBFBFB] md:max-w-5xl mx-auto">
<div className="flex flex-col md:flex-row gap-6 md:p-7 rounded-lg">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={item.image}
          alt="Coffee & Catch Up"
          className="w-full rounded-lg"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex px-3 flex-col justify-between">
        <h2 className="text-3xl text-black mbold font-bold">{item.name}</h2>
        <p className="text-2xl text-[#000000] msemi font-semibold">
         AED {item.price} <span className="text-[11px] text-gray-500">Including VAT</span>
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center text-black gap-4 my-2">
          <span className="text-lg font-medium">Qty</span>
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <button className="text-xl px-2" onClick={decreaseQty}>−</button>
            <span className="px-4 text-lg">{quantity}</span>
            <button className="text-xl px-2" onClick={increaseQty}>+</button>
          </div>
          <Button onClick={()=> addToCart(item)} type="primary" className="bg-white rounded-3xl text-black border w-48 h-10 border-black">Add to cart</Button>
        </div>

        <div className="flex items-center gap-4">
          
               <Button
                    className="w-[400px] rounded-3xl bg-black text-white h-12 flex items-center justify-center gap-3 border-2"
                    type="default"
                  >
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                    <span className="text-base font-semibold ">Chat to Shop</span>
                  </Button>
        </div>
<div className="space-y-3 hidden md:block">
<p className="text-gray-600 mreg text-sm">
          Join a relaxed & informal morning where you can connect & chat with other new mums & babies can play.
        </p>
        <p className="text-gray-600 mreg text-sm">
          The price includes 3hrs of play, your choice of a drink and professional care support.
        </p>
        <p className="text-gray-600 mreg text-sm">
          Flexi drop-in time so you can come when suits you best.
        </p>
        <p className="text-gray-600 mreg text-sm">The focus is on babies from newborn to 1 year old.</p>
</div>
      </div>
    </div>
    <Review />
      <OtherItems  handleClick={handleClick} />

</div>
  );
};

export default CoffeeCatchupCard;
