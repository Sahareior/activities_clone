"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Image from "next/image";

const Items = () => {
  const router = useRouter();
  const { activeTab, setActiveTab, setNavigated } = useAppContext();
  const [loading, setLoading] = useState(true)
  const [visibleItems, setVisibleItems] = useState(8);
  const [data, setData] = useState([]);

  // Set default tab when component mounts
  useEffect(() => {
    if (!activeTab) {
      setActiveTab('3-piece');
    }
  }, [setActiveTab, activeTab]);

  const handleFetch = async () => {
    const response = await axios.get("https://server-sijans-projects-f3bcab8f.vercel.app/allproducts");
    setData(response.data);
  };

  useEffect(() => {
    handleFetch();
    setLoading(false)
  }, []);

  // Filter data based on active tab
  let finalData = [];
  if (activeTab === '3-piece') {
    finalData = data.filter(items => items.category === '3-piece');
  } else if (activeTab === 'jeans') {
    finalData = data.filter(items => items.category === 'jeans');
  }

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleNavigate = (path, sess) => {
    setNavigated(sess);
    router.push(path);
  };


  if(loading){
    <p>Loading....</p>
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="my-9">
          <h2 className="mex text-[18px] text-[#000000] mb-2 capitalize">
            {activeTab?.replace('-', ' ') || '3 piece'}
          </h2>
          <p className="text-gray-600 mreg text-sm">
            {activeTab === 'jeans' 
              ? "Premium quality jeans for perfect fit and comfort"
              : "Stylish three-piece outfits for every occasion"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {finalData.slice(0, visibleItems).map((session) => (
            // ... rest of your JSX remains the same
            <div
              key={session.id}
              className="flex items- bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 w-1/2">
                <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">
                  {session.title}
                </h3>
                <p className="text-slate-500 msemi mt-1 text-[12px]">
                  {session.price} TK
                </p>
              </div>
              <div className="w-1/2 h-32">
                <Image
                  onClick={() => handleNavigate(`/details/${session._id}`, session)}
                  src={session.img}
                  alt={session.title}
                  width={200}
                  height={128}
                  className="w-full h-full object-cover rounded-r-xl"
                  priority={false}
                  placeholder="blur"
                  unoptimized 
                  blurDataURL="/path-to-low-res-placeholder.jpg"
                />
              </div>
            </div>
          ))}
        </div>

        {visibleItems < finalData.length && (
          <p
            className="text-center text-[16px] mbold text-slate-400 mt-5 underline cursor-pointer"
            onClick={handleShowMore}
          >
            Show More
          </p>
        )}
      </div>
    </div>
  );
};

export default Items;