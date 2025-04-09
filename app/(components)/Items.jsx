"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Image from "next/image";
import CryptoJS from "crypto-js";

const Items = () => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useAppContext();
  const [visibleItems, setVisibleItems] = useState(8);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!activeTab) {
      setActiveTab("3-piece");
    }
  }, [setActiveTab, activeTab]);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "https://server-sijans-projects-f3bcab8f.vercel.app/allproducts"
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const finalData = data.filter((items) =>
    activeTab === "3-piece"
      ? items.category === "3-piece"
      : items.category === "jeans"
  );

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleNavigate = (path, sess) => {
    const secretKey = "yourSecretKey";
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(sess),
      secretKey
    ).toString();
    router.push(`${path}?data=${encodeURIComponent(encryptedData)}`);
  };

  return (
    <div className="space-y-4">
      <div className="my-9">
        <h2 className="mex text-[18px] text-[#000000] mb-2 capitalize">
          {activeTab?.replace("-", " ") || "3 piece"}
        </h2>
        <p className="text-gray-600 mreg text-sm">
          {activeTab === "jeans"
            ? "Premium quality jeans for perfect fit and comfort"
            : "Stylish three-piece outfits for every occasion"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {finalData.slice(0, visibleItems).map((session) => (
          <div
            key={session.id}
            className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[128px] max-h-[128px]"
          >
            {/* Text Column */}
            <div className="p-4 w-1/2 flex flex-col justify-center space-y-1">
              <h3 className="text-[16px] font-bold text-[#000000] leading-tight min-h-[38px]">
                {session.title}
              </h3>
              <p className="text-slate-600 msemi text-[12px] leading-tight min-h-[16px]">
                {session.price} TK
              </p>
            </div>

            {/* Image Column */}
            <div className="w-1/2 relative min-h-[128px] max-h-[128px]">
              <Image
                onClick={() =>
                  handleNavigate(`/details/${session._id}`, session)
                }
                src={session.img}
                alt={session.title}
                fill
                className="object-cover rounded-r-xl cursor-pointer"
                sizes="(max-width: 768px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              />
            </div>
          </div>
        ))}
      </div>

      {/* No Data Fallback */}
      {finalData.length === 0 && (
        <div className="min-h-[128px] flex items-center justify-center">
          <p className="text-lg font-semibold">No data available.</p>
        </div>
      )}

      {/* Show More Button (space always reserved) */}
      <div className="mt-5 min-h-[40px] flex justify-center items-center">
        {visibleItems < finalData.length && (
          <p
            className="text-center text-[16px] mbold text-slate-400 underline cursor-pointer"
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
