"use client"

import React, { useEffect, useState } from "react";
import { Button, Flex } from 'antd';
import { IoCartOutline } from "react-icons/io5";


const Navigations = () => {
      const [loading, setLoading] = useState(true)
      useEffect(()=>{
        setLoading(false)
      },[])
      if(loading){
        return(
          <p>Loading...</p>
        )
      }
    return (
        <div className='my-3 border-b-2 pb-4'>
                      {/* Right Side (Buttons & Cart) */}
          <div className="flex  justify-between w-full">
        <div className="flex gap-2">
        <Button className="rounded-3xl text-xs bg-black font-extrabold" type="primary">Play Sessions</Button>
        <Button type="primary" className="rounded-3xl text-xs bg-black font-extrabold">All Iems</Button>
        </div>

        <div className="ml-4 relative font-extrabold hidden md:block hover:text-gray-600 transition-colors">
    <IoCartOutline size={24} className="cursor-pointer" />
    <div className="absolute -top-2 -right-2 flex items-center justify-center">
        <span className="bg-red-500 text-white text-xs font-medium px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center select-none">
            1
        </span>
    </div>
</div>
          </div>
        </div>
    );
};

export default Navigations;