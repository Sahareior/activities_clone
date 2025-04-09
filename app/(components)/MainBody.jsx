"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spin } from "antd";

// Enhanced Dynamic Imports with accurate skeletons
const Navigations = dynamic(() => import("./Navigations"), {
  loading: () => (
    <div className="h-16 w-full bg-gray-200 rounded animate-pulse mb-4" />
  ),
  ssr: false,
});

const LeftSide = dynamic(() => import("./LeftSide"), {
  loading: () => (
    <div className="h-[600px] w-full bg-gray-200 rounded animate-pulse" />
  ),
  ssr: false,
});

const Items = dynamic(() => import("./Items"), {
  loading: () => (
    <div className="w-full space-y-4">
      {/* Category Title Skeleton */}
      <div className="my-9 space-y-2">
        <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
      {/* Grid Items Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex min-h-[128px] bg-gray-200 rounded-xl">
            <div className="w-1/2 p-4 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="w-1/2 h-32 bg-gray-300 rounded-r-xl" />
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <div className="h-20 mt-4 bg-gray-100 rounded animate-pulse w-full" />,
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
      {/* Banner Section with Stable Height */}
      <div className="relative w-full bg-white max-w-5xl h-[350px]">
        <Image
          src="/timage.webp"
          alt="Banner"
          fill
          priority
          className="object-cover rounded-t-lg"
          placeholder="blur"
          blurDataURL="/timage-placeholder.webp"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
        />
      </div>

      {/* Main Content Section with Stable Grid */}
      <div className="w-full max-w-5xl bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left Side with Fixed Width */}
          <div className="w-full md:w-[34vw] md:sticky md:top-0 md:self-start">
            <LeftSide />
          </div>

          {/* Right Side with Scroll Containment */}
          <div className="w-full px-4 py-7 md:pl-10">
            <Navigations />
            <div className="flex flex-col gap-y-4">
              {/* Items with Stable Scroll Height */}
             
              <div className="w-full px-4 py-7 md:pl-10 min-h-screen flex flex-col justify-start items-start">
  <Items />
</div>


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