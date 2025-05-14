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
      {/* Stable Banner Section */}
      <div className="relative w-full bg-white max-w-5xl rounded-t-lg">
        <div className="aspect-[16/5.5] hidden md:block relative overflow-hidden rounded-b-2xl">
          <Image
            src="/bannerImagelol.webp"
            alt="Banner"
            fill
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL="/timage-placeholder.webp"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Stable Main Content */}
      <div className="relative w-full max-w-5xl bg-white">
        <div className="flex flex-col md:flex-row w-full items-start">
          {/* Left Side - Fixed dimensions */}
          <div className="w-full md:w-[34vw] rounded-t-lg">
            <div className="mt-3 w-full md:h-[640px] overflow-hidden">
              <LeftSide />
            </div>
          </div>

          {/* Right Side - Fixed height container */}
<div
  className="w-full relative px-4 md:pt-7 mt-3 pb-7 md:pl-10 h-[750px] md:h-[600px] bg-white"
>
  <Navigations />
  <div className="flex overflow-y-auto flex-col h-full gap-y-4">
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
