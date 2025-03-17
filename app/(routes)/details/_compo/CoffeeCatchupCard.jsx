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
import Image from "next/image"; // If using Next.js

const CoffeeCatchupCard = ({ product }) => {
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { clicked, setClicked, navigated } = useAppContext();
    const [item, setItem] = useState(navigated); 

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleClick = (data) => {
        setItem(data);
    }

    const addToCart = (data) => {
        addToDb(data);
        setClicked(!clicked);
    }

    return (
        <div className="bg-[#FBFBFB] md:max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:p-7 rounded-lg">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={product.img}
                        alt="Coffee & Catch Up"
                        width={600} // Set a width and height for proper optimization
                        height={400}
                        className="w-full rounded-lg object-contain max-h-[600px] lazyload" // Added lazyload for optimization
                        placeholder="blur" // Adds blur effect on image load
                        blurDataURL={product.img} // If you have a base64 image as a placeholder
                    />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 flex px-3 flex-col gap-8">
                    <h2 className="text-3xl text-black mbold font-bold">{product.title}</h2>
                    <p className="text-2xl text-[#000000] msemi font-semibold">
                        {product.price} TK <span className="text-[11px] text-gray-500">Including VAT</span>
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center text-black gap-4">
                        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                            <button className="text-xl px-2" onClick={decreaseQty}>−</button>
                            <span className="px-4 text-lg">{quantity}</span>
                            <button className="text-xl px-2" onClick={increaseQty}>+</button>
                        </div>
                        <Button 
                            onClick={() => addToCart(item)} 
                            type="primary" 
                            className="bg-white rounded-3xl text-black border w-36 h-10 border-black">
                            Add to cart
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            className="w-[200px] my-3 rounded-3xl bg-black text-white h-12 flex items-center justify-center gap-3 border-2"
                            type="default"
                        >
                            <FaWhatsapp className="w-6 h-6 text-green-500" />
                            <span 
                                onClick={() => window.open("https://wa.me/8801726369220", "_blank")}
                                className="text-base font-semibold">
                                Chat to Shop
                            </span>
                        </Button>
                    </div>

                    <div className="space-y-3 mt-3 hidden md:block">
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
        </div>
    );
};

export default CoffeeCatchupCard;
