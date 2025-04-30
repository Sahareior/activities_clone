"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import CryptoJS from "crypto-js";

const Items = () => {
  const router = useRouter();
  const { activeTab, setActiveTab, loading, data } = useAppContext();
  const [visibleItems, setVisibleItems] = useState(8);

  // Set default tab and restore visibleItems on mount
  useEffect(() => {
    const savedVisibleItems = sessionStorage.getItem("visibleItems");
    if (savedVisibleItems) {
      setVisibleItems(Number(savedVisibleItems));
    }

    if (!activeTab) {
      setActiveTab("3-piece");
    }

    // Scroll to previously viewed item or scroll position
    const scrollToId = sessionStorage.getItem("scrollToId");
    const scrollY = sessionStorage.getItem("scrollY");

    console.log('scrollY', scrollY)

    setTimeout(() => {
if (scrollToId) {
  const element = document.getElementById(scrollToId);
  if (element) {
    const yOffset = -80; // Adjust this based on your header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "auto" });
  } else if (scrollY) {
    window.scrollTo({ top: parseInt(scrollY), behavior: "smooth" });
  }
}

    }, 100);
  }, [setActiveTab, activeTab]);

  // Filter data based on active tab
  let finalData = [];
  if (activeTab === "3-piece") {
    finalData = data.filter((items) => items.category === "3-piece");
  } else if (activeTab === "jeans") {
    finalData = data.filter((items) => items.category === "jeans");
  }

  const handleShowMore = () => {
    const newCount = visibleItems + 6;
    setVisibleItems(newCount);
    sessionStorage.setItem("visibleItems", newCount.toString());
  };

  const handleNavigate = (path, sess) => {
    const secretKey = "yourSecretKey";
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sess), secretKey).toString();
    const encodedData = encodeURIComponent(encryptedData);

    sessionStorage.setItem("visibleItems", visibleItems.toString());
    sessionStorage.setItem("scrollToId", sess._id);
    sessionStorage.setItem("scrollY", window.scrollY.toString());

    router.push(`${path}?data=${encodedData}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

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
        {loading ? (
          <div className="flex justify-center items-center col-span-1 md:col-span-2 h-40">
            <Spin size="large" />
          </div>
        ) : finalData.length === 0 ? (
          <p className="text-center col-span-1 md:col-span-2 text-lg font-semibold">
            No data available.
          </p>
        ) : (
          finalData.slice(0, visibleItems).map((session) => (
            <div
              key={session.id}
              id={session._id}
              className="flex items- bg-fuchsia-50 hover:cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:p-4 p-2 py-5 w-1/2">
                <h3 className="md:text-[16px] text-[14px] font-bold text-[#000000] mb-0 leading-[1.2]">
                  {session.title}
                </h3>
                <p className="text-slate-600 msemi mt-1 text-[12px]">
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
          ))
        )}
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
  );
};

export default Items;
