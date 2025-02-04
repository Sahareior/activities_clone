"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const playSessions = [
    {
      id: 1,
      title: "Coffee & Catchup - Monday",
      price: "AED 65.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 2,
      title: "Creative Arts - Wednesday",
      price: "AED 85.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 3,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 34,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 33,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 31,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 32,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
    {
      id: 4,
      title: "Magical Play - Saturday",
      price: "AED 95.00",
      imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
    },
  ];


const Items = () => {
  const router = useRouter();
     const {clicked,setClicked,cart,activeTab, setActiveTab} = useAppContext()
  const [visibleItems, setVisibleItems] = useState(2);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 2);
  };

  const handleNavigate = (path) => {
    router.push(path);
  };
console.log(activeTab)
  return (
    <div className="space-y-4 ">
      {/* Play Sessions */}
  {
    activeTab === 'play'?(
   <div>
       <div>
      <div className="mb-6">
        <h2 className="mex text-[18px]  text-[#000000] mb-2">Play Sessions</h2>
        <p className="text-gray-600 mreg text-sm">Explore our engaging activities designed for creative learning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {playSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 w-1/2">
              <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">{session.title}</h3>
              <p className="text-slate-500 msemi mt-1 text-[12px]">{session.price}</p>
            </div>
            <div className="w-1/2 h-32">
              <img
                onClick={() => handleNavigate("/details")}
                src={session.imageUrl}
                alt={session.title}
                className="w-full h-full object-cover rounded-r-xl"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <div className="my-9">
        <h2 className="mex text-[18px]  text-[#000000] mb-2">All Items</h2>
        <p className="text-gray-600 mreg text-sm">Explore our engaging activities designed for creative learning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {playSessions.slice(0, visibleItems).map((session) => (
          <div
            key={session.id}
            className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 w-1/2">
            <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">{session.title}</h3>

              <p className="text-slate-500 msemi mt-1 text-[12px]">{session.price}</p>
            </div>
            <div className="w-1/2 h-32">
              <img
                onClick={() => handleNavigate("/details")}
                src={session.imageUrl}
                alt={session.title}
                className="w-full h-full object-cover rounded-r-xl"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {visibleItems < playSessions.length && (
        <p
          className="text-center text-[16px] mbold text-slate-400 mt-5 underline cursor-pointer"
          onClick={handleShowMore}
        >
          Show More
        </p>
      )}
    </div>
   </div>
    ):(
<div>
<div>
      <div className="my-9">
        <h2 className="mex text-[18px]  text-[#000000] mb-2">All Items</h2>
        <p className="text-gray-600 mreg text-sm">Explore our engaging activities designed for creative learning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {playSessions.slice(0, visibleItems).map((session) => (
          <div
            key={session.id}
            className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 w-1/2">
            <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">{session.title}</h3>

              <p className="text-slate-500 msemi mt-1 text-[12px]">{session.price}</p>
            </div>
            <div className="w-1/2 h-32">
              <img
                onClick={() => handleNavigate("/details")}
                src={session.imageUrl}
                alt={session.title}
                className="w-full h-full object-cover rounded-r-xl"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {visibleItems < playSessions.length && (
        <p
          className="text-center text-[16px] mbold text-slate-400 mt-5 underline cursor-pointer"
          onClick={handleShowMore}
        >
          Show More
        </p>
      )}
    </div>
</div>
    )
  }
    </div>
  );
};

export default Items;