"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spin } from "antd";

// Dynamic Imports with dimension-matched skeletons
const Navigations = dynamic(() => import("./Navigations"), {
  loading: () => (
    <div className="h-16 w-full bg-gray-200 rounded animate-pulse" /> // Matches actual component height
  ),
  ssr: false,
});

const LeftSide = dynamic(() => import("./LeftSide"), {
  loading: () => (
    <div className="h-[600px] w-full bg-gray-200 rounded animate-pulse" /> // Adjusted to actual content height
  ),
  ssr: false,
});

const Items = dynamic(() => import("./Items"), {
  loading: () => (
    <div className="space-y-4 animate-pulse w-full">
      {[...Array(5)].map((_, i) => ( // Mimics actual item count
        <div key={i} className="h-24 bg-gray-200 rounded-lg" /> // Matches item height
      ))}
    </div>
  ),
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <div className="h-20 bg-gray-100 rounded animate-pulse w-full" />, // Matches footer height
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

  return (
    <div className="flex flex-col items-center bg-slate-200">
      {/* Banner Section */}
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

      {/* Main Content Section */}
      <div className="relative w-full max-w-5xl bg-white">
        <div className="flex flex-col md:flex-row w-full items-start">
          {/* Left Side */}
          <div className="flex flex-col w-full md:w-[34vw] rounded-t-lg md:items-start">
            <div className="mt-3 w-full">
              <LeftSide />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full relative px-4 py-7 md:pl-10">
            <Navigations />
            <div className="flex flex-col gap-y-4 mt-4">
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