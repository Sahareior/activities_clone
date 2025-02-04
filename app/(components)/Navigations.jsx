"use client"

import React, { useEffect, useState } from "react";
import { Button, Flex } from 'antd';
import { IoCartOutline } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import CartModal from "../(routes)/details/_compo/CartModal";

const Navigations = () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { clicked, setClicked, cart, activeTab, setActiveTab } = useAppContext();

  useEffect(() => {
    setLoading(false);
    setClicked(!clicked);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className=" py-4 border-b-2 sticky top-0 z-10 bg-white">
      {/* Right Side (Buttons & Cart) */}
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab('play')}
            className={`rounded-3xl h-9 text-xs font-extrabold ${
              activeTab === 'play' ? 'bg-black text-white' : 'bg-slate-200 text-black'
            }`}
            type="primary"
          >
            Play Sessions
          </Button>
          <Button
            onClick={() => setActiveTab('all')}
            className={`rounded-3xl h-9 w-28 text-xs font-extrabold ${
              activeTab === 'all' ? 'bg-black text-white' : 'bg-slate-200 text-black'
            }`}
            type="primary"
          >
            All Items
          </Button>
        </div>

        <div onClick={showModal} className="ml-4 relative font-extrabold text-black hidden md:block hover:text-gray-600 transition-colors">
          <IoCartOutline size={24} className="cursor-pointer" />
          <div className="absolute text-black -top-2 -right-2 flex items-center justify-center">
            <span className="bg-black text-white text-xs font-medium px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center select-none">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
      <CartModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default Navigations;
