"use client"

import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import { TbArrowWaveRightDown } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { BiHappyAlt } from "react-icons/bi";
import { 
  FaFacebook,
  FaChevronDown, 
  FaInstagram, 
  FaInternetExplorer, 
  FaTwitter, 
  FaWhatsapp 
} from "react-icons/fa";

const LeftSide = () => {
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  // Simulate loading
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  // Full and truncated texts for the About Us section.
  const fullAboutText = `Trendora is your go-to destination for stylish and elegant fashion. We offer a premium collection of formal and Punjabi dresses, blending tradition with modern trends. Whether you're looking for timeless classics or contemporary outfits, Trendora ensures top-quality fabrics and exclusive designs to elevate your style.`;
  const truncatedAboutText = `Trendora is your go-to destination for stylish and elegant fashion. We offer a premium collection of formal and Punjabi dresses, blending tradition with modern trends....`;

  return (
    <div className="space-y-1 p-2 md:px-5">
      {/* Header Section */}
      <div className="space-y-1 mb-3 flex flex-col gap-2 justify-center items-center px-3 md:px-0">
        <img className="w-24 h-24 rounded-full" src="/logo.png" alt="" />

        <h2 className="text-xl mbold text-start text-gray-800">
       Trendora
        </h2>
        <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
          <BiHappyAlt className="text-yellow-500" size={28} />
          <strong>4.5</strong>
          <span className="text-sm text-slate-500">(554 ratings)</span>
        </div>
        <p className="text-[13px] text-center w-full text-gray-500 font-medium">
          Dhaka, Bangladesh
        </p>
      </div>

      <div className="space-y-5 hidden md:block">
        {/* Chat Button */}
        <Button
  className="w-full bg-green-500 rounded-3xl h-12 flex items-center justify-center gap-3 border-2"
  type="default"
  onClick={() => window.open("https://wa.me/8801726369220", "_blank")}
>
  <FaWhatsapp className="w-6 h-6 bg-green-500 text-white" />
  <span className="text-base font-semibold text-white">Chat to Shop</span>
</Button>


        {/* About Section */}
        <div className="space-y-2">
          <h3 className="text-[16px] msemi text-gray-800 border-b pb-2">
            About Us
          </h3>
          <div className="flex gap-3 items-start">
            <p className="text-black mreg text-[13px] w-56 leading-relaxed">
              {showAbout ? fullAboutText : truncatedAboutText}
            </p>
            <FaChevronDown
  onClick={() => setShowAbout(!showAbout)}
  className={`cursor-pointer transform scale-100 text-black transition duration-300 text-[24px] ${showAbout ? "rotate-180" : ""}`}
/>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
  <div className="flex items-center text-[13px] gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
    <FaInternetExplorer className="w-5 h-5" />
    <span className="text-[13px] font-bold text-[#000000]">www.childunplugged.com</span>
  </div>

  <div className="flex items-center gap-3 text-gray-600 hover:text-pink-600 cursor-pointer">
    <FaInstagram className="w-5 h-5" />
    <span className="text-[13px] font-bold text-[#000000]">@childunplugged</span>
  </div>

  <div className="flex items-center gap-3 text-gray-600 hover:text-blue-700 cursor-pointer">
    <FaFacebook className="w-5 h-5" />
    <a href="https://web.facebook.com/profile.php?id=61571994037317" className="text-[13px] font-bold text-[#000000]">
      ChildUnpluggedOfficial
    </a>
  </div>
</div>

        </div>

        <div>
          <h4 className="flex gap-2 text-slate-700 msemi text-[16px]">
            Share this Shop <TbArrowWaveRightDown size={22} />
          </h4>
        </div>
        <div className="flex text-slate-400 gap-7">
          <FaFacebook size={22} />
          <FaInstagram   size={22}/>
          <FaTwitter  size={22} />
          <FaWhatsapp   size={22}/>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
