"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spin } from "antd";

// Dynamically import heavy or non-critical components
const Navigations = dynamic(() => import("./Navigations"), {
  loading: () => <div>Loading navigation...</div>,
  ssr: false,
});

const LeftSide = dynamic(() => import("./LeftSide"), {
  loading: () => <div>Loading sidebar...</div>,
  ssr: false,
});

const Items = dynamic(() => import("./Items"), {
  loading: () => <div>Loading items...</div>,
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <div>Loading footer...</div>,
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
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex bg-slate-200 flex-col items-center">
      {/* Banner Section */}
      <div className="relative w-full rounded-t-lg bg-white max-w-5xl">
      <Image
  src="/timage.webp"
  alt="Banner"
  width={1200}
  height={350}
  priority
  loading="eager"
  placeholder="blur"
  blurDataURL="/timage-placeholder.webp"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
  className="w-full h-[350px] rounded-b-2xl object-cover"
/>


        {/* MainBody Section */}
        <div className="flex flex-col md:flex-row w-full items-start">
          {/* Left Side */}
          <div className="flex flex-col w-full md:w-[34vw] rounded-t-lg md:items-start">
            <div className="mt-3 w-full">
              <LeftSide />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full rounded-t-lg relative px-4 py-7 md:pl-10">
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
