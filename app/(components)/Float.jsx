"use client"
import React, { useEffect, useState } from 'react';
import { FaHome, FaSearch, FaCartArrowDown, FaUser } from 'react-icons/fa';
import CartModal from '../(routes)/details/_compo/CartModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

const Float = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
const router = useRouter()
  const [isClient, setIsClient] = useState(false);
    const { clicked, setClicked, cart, activeTab, setActiveTab } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // This will ensure the component is rendered only on the client side
    setIsClient(true);
    setClicked(!clicked)
  }, []);

  if (!isClient) {
    return null; // Avoid rendering during server-side rendering (SSR)
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
    <div className="fixed z-50 md:hidden bottom-0 w-full bg-gray-800 text-white flex justify-around py-3 rounded-t-xl shadow-md">
      <div className="flex flex-col items-center">
        <Link href="/">
          <FaHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <FaSearch size={24} />
        <span className="text-xs mt-1">Search</span>
      </div>
      <div onClick={showModal} className="flex flex-col items-center relative">
        <FaCartArrowDown size={24} />
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 absolute -top-2 -right-2">{cart.length}</span>
        <span className="text-xs mt-1">Cart</span>
      </div>

      <CartModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default Float;
