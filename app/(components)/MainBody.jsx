"use client"

import React, { useEffect, useState } from "react";

import Navigations from "./Navigations";
import LeftSide from "./LeftSide";
import Items from "./Items";


const MainBody = () => {
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
    <div className="flex bg-slate-200 flex-col items-center ">
      {/* Banner Section */}
      <div className="relative w-full rounded-t-lg bg-white max-w-4xl">
        <img
          src="https://dlxl63y8t41yr.cloudfront.net/media/banners/activities_V6xaKOC.jpg"
          alt="Banner"
          className="w-full h-[250px] rounded-b-2xl object-cover "
        />
        {/* Floating Logo on Left */}
        <div className="absolute md:left-20 left-5 top-56">
          <img
            src="https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fbusiness_logos%2FChild_Unplugged_Logo.png&w=128&q=75"
            alt="Logo"
            className="w-20 h-20 rounded-lg "
          />
        </div>

        {/* MainBody Section */}
        <div className="flex flex-col  md:flex-row w-full items-start">
  {/* Left Side (Logo & Details) */}
  <div className="flex flex-col w-full md:w-[32vw] rounded-t-lg  md:items-start">
    <div className="mt-16 ">
      <LeftSide />
    </div>
  </div>

  {/* Right Side (Navigation & Items) */}
  <div className="flex flex-col w-full rounded-t-lg gap-y-4 px-4 md:pl-10">
    <Navigations />
    <Items />
  </div>
</div>

      </div>
    </div>
  );
};

export default MainBody;
