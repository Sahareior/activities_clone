"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spin } from "antd";

// Dynamic Imports with stable skeletons
const Navigations = dynamic(() => import("./Navigations"), {
  loading: () => (
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
  ),
  ssr: false,
});

const LeftSide = dynamic(() => import("./LeftSide"), {
  loading: () => (
    <div className="h-[500px] w-full bg-gray-200 rounded animate-pulse" />
  ),
  ssr: false,
});

const Items = dynamic(() => import("./Items"), {
  loading: () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-full" />
      <div className="h-6 bg-gray-300 rounded w-5/6" />
      <div className="h-6 bg-gray-300 rounded w-2/3" />
    </div>
  ),
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <div className="h-10 bg-gray-100 rounded animate-pulse" />,
  ssr: false,
});

const Float = dynamic(() => import("./Float"), {
  ssr: false,
});

const MainBody = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydration complete immediately
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[350px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex  flex-col items-center bg-slate-600">
      {/* ✅ Banner Section: Improves LCP & CLS */}
      <div className="relative w-full bg-white max-w-5xl rounded-t-lg">
        <div className="relative w-full h-[350px] overflow-hidden rounded-b-2xl">
          <Image
            src="/timage.webp"
            alt="Banner"
            fill
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL="/timage-placeholder.webp"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ✅ Main Content Section */}
      <div className="relative w-full max-w-5xl bg-white">
        <div className="flex flex-col md:flex-row w-full items-start">
          {/* Left Side */}
          <div className="flex flex-col w-full md:w-[34vw] rounded-t-lg md:items-start">
            <div className="mt-3 w-full">
              <LeftSide />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full relative px-4 py-7 md:pl-10 min-h-[750px] md:min-h-[650px]">
            <Navigations />
            <div className="flex flex-col gap-y-4 md:overflow-y-auto md:h-[calc(1210px-600px)] h-full no-scrollbar">
              <Items />
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <Float />
    </div>
  );
};

export default MainBody;