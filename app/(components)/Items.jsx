"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const playSessions = [
    {
      id: 1,
      title: "Coffee & Catchup - Monday",
      price: "AED 65.00",
      imageUrl: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726721_640.jpg",
    },
    {
      id: 2,
      title: "Creative Arts - Wednesday",
      price: "AED 85.00",
      imageUrl: "https://img.freepik.com/free-photo/man-riding-bicycle-urban-city-holding-hands-handlebar_158595-4620.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
    },
    {
      id: 3,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://img.freepik.com/premium-photo/stylish-blonde-girl-wearing-black-t-shirt-posing_281858-1410.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
    },
    {
      id: 34,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://img.freepik.com/free-photo/positive-young-woman-with-trendy-haircut-dancing-blue-t-shirt_197531-7171.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
    },
    {
      id: 33,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://img.freepik.com/free-photo/young-beautiful-worker-woman-wearing-staff-uniform-tshirt-isolated-yellow-background-doing-ok-gesture-shocked-with-surprised-face-eye-looking-through-fingers-unbelieving-expression_839833-5943.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
    },
    {
      id: 31,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://img.freepik.com/premium-photo/cheerful-young-man-hat-sunglasses-standing-smiling_361425-1869.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
    },
    {
      id: 32,
      title: "Music & Movement - Friday",
      price: "AED 75.00",
      imageUrl: "https://img.freepik.com/premium-photo/young-red-head-pretty-woman-smiling-positively-confidently-looking-satisfied-friendly-happy_1194-51411.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
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
     const {clicked,setClicked,cart,activeTab,setNavigated, setActiveTab} = useAppContext()
  const [visibleItems, setVisibleItems] = useState(2);
  const [data,setData] = useState([])

  const handleFetch = async()=>{
    const response = await axios.get("https://kellas-sahareior-sijans-projects-f3bcab8f.vercel.app/allproducts");
    
    setData(response.data)
  }

  useEffect(() => {
    handleFetch(); // Fetch data when the component mounts
  }, []);

  console.log(data)

  const threePieces = data.filter(items => items.category === '3-piece')

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 2);
  };

  const handleNavigate = (path,sess) => {
    // console.log(sess)
    setNavigated(sess)
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
        <h2 className="mex text-[18px]  text-[#000000] mb-2">3 Pieces</h2>
        <p className="text-gray-600 mreg text-sm">Explore our engaging activities designed for creative learning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {threePieces.map((session) => (
          <div
            key={session.id}
            className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 w-1/2">
              <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">{session.title}</h3>
              <p className="text-slate-500 msemi mt-1 text-[12px]">{session.price} TK</p>
            </div>
            <div className="w-1/2 h-32">
              <img
               onClick={() => handleNavigate(`/details/${session._id}`,session)}
                src={session.img}
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
        {threePieces.slice(0, visibleItems).map((session) => (
          <div
            key={session._id}
            className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 w-1/2">
            <h3 className="text-[15px] font-bold text-[#000000] mb-0 leading-[1.2]">{session.title}</h3>

              <p className="text-slate-500 msemi mt-1 text-[12px]">{session.price} TK</p>
            </div>
            <div className="w-1/2 h-32">
              <img
                onClick={() => handleNavigate(`/details/${session._id}`,session)}
                src={session.img}
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