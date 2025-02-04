"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiHappyAlt } from 'react-icons/bi';
import { IoCartOutline } from 'react-icons/io5';

import CartModal from './details/_compo/CartModal';
import { useAppContext } from '../context/AppContext';

const DetailsHeader = () => {
  const router = useRouter();
     const {clicked,cart} = useAppContext()

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div className='max-w-5xl hidden md:block rounded-t-2xl mx-auto bg-white p-3 px-8'>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img 
            onClick={() => router.push('/')} 
            src="https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fbusiness_logos%2FChild_Unplugged_Logo.png&w=96&q=75" 
            alt="" 
          />
          <div className="space-y-1 px-3 md:px-0">
            <h2 className="text-xl font-extrabold text-start text-gray-800">
              The Child Unplugged
            </h2>
            <div className="flex gap-1 text-sm text-gray-600">
              <BiHappyAlt className="text-yellow-500" size={28} />
              <strong>4.5</strong>
              <p className="text-[13px] w-full text-gray-500 font-medium">
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>
        </div>
        <div className='flex gap-3'>
          <div 
            className="ml-4 relative font-extrabold text-black hidden md:block hover:text-gray-600 transition-colors" 
            onClick={showModal}
          >
            <IoCartOutline size={24} className="cursor-pointer" /> 
            <div className="absolute text-black -top-2 -right-2 flex items-center justify-center">
              <span className="bg-red-500 text-white text-xs font-medium px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center select-none">
                {cart.length}
              </span>
            </div>
          </div>
          <h3 className='font-bold text-black'>Your Cart</h3>
        </div>
      </div>
      {/* isModalVisible,handleOk,handleCancel */}
<CartModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default DetailsHeader;
