"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spin } from "antd";

// Static import for critical above-the-fold components
import Navigations from "./Navigations";

// Dynamic imports with dimension-matched skeletons
const LeftSide = dynamic(() => import("./LeftSide"), {
  loading: () => (
    <div className="h-[640px] w-full bg-gray-200 rounded animate-pulse" />
  ),
  ssr: false,
});

const Items = dynamic(() => import("./Items"), {
  loading: () => (
    <div className="h-[600px] w-full bg-gray-200 rounded animate-pulse" />
  ),
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => (
    <div className="h-[120px] w-full bg-gray-100 rounded animate-pulse" />
  ),
  ssr: false,
});

const Float = dynamic(() => import("./Float"), {
  ssr: false,
});

const MainBody = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
   <div className="flex flex-col items-center bg-slate-600">
      {/* Optimized Banner Section */}
      <div className="relative w-full bg-white max-w-5xl rounded-t-lg shadow-sm">
        <div className="aspect-[16/5.5] relative overflow-hidden rounded-b-2xl">
          <Image
            src="/bannerImagelol.webp"
            alt="Banner"
            fill
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL="/timage-placeholder.webp"
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Performance-optimized Main Content */}
      <div className="relative w-full max-w-5xl bg-white">
        <div className="flex flex-col md:flex-row w-full items-start gap-4">
          {/* Left Side - Stable Dimensions */}
          <div className="w-full md:w-[34vw] rounded-t-lg">
            <div className="mt-3 w-full md:h-[640px] h-[260px] overflow-hidden">
              <LeftSide />
            </div>
          </div>

          {/* Right Side - Optimized Scroll Container */}
          <div className="w-full relative px-4 md:pl-8 h-[750px] md:h-[650px] overflow-y-auto bg-white">
            <div className="sticky top-0 z-10 bg-white pt-3 pb-2 border-b">
              <Navigations />
            </div>
            <div className="flex flex-col gap-y-4 pt-2 px-2">
              <Items />
              <Footer className="mt-4" />
            </div>
          </div>
        </div>
      </div>

      <Float />
    </div>
  );
};

export default MainBody;