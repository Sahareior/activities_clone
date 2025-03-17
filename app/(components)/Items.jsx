"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Image from "next/image";

const playSessions = [
   
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
<Image
  onClick={() => handleNavigate(`/details/${session._id}`, session)}
  src={session.img}
  alt={session.title}
  width={200}  // Adjust according to your layout
  height={128} // Adjust according to your layout
  className="w-full h-full object-cover rounded-r-xl"
  unoptimized 
  priority={false}  // Set true if it's above the fold
  placeholder="blur"  // Optionally use blur placeholder
  blurDataURL="/path-to-low-res-placeholder.jpg"  // Replace with actual low-res image
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
         
{/* */}

<Image
  onClick={() => handleNavigate(`/details/${session._id}`, session)}
  src={session.img}
  alt={session.title}
  width={200}  // Adjust according to your layout
  height={128} // Adjust according to your layout
  className="w-full h-full object-cover rounded-r-xl"
  priority={false}  // Set true if it's above the fold
  placeholder="blur"  // Optionally use blur placeholder
  unoptimized 
  blurDataURL="/path-to-low-res-placeholder.jpg"  // Replace with actual low-res image
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
            <Image
  onClick={() => handleNavigate(`/details/${session._id}`, session)}
  src={session.img}
  alt={session.title}
  width={200}  // Adjust according to your layout
  height={128} // Adjust according to your layout
  className="w-full h-full object-cover rounded-r-xl"
  priority={false}  // Set true if it's above the fold
  placeholder="blur"  // Optionally use blur placeholder
  unoptimized 
  blurDataURL="/path-to-low-res-placeholder.jpg"  // Replace with actual low-res image
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