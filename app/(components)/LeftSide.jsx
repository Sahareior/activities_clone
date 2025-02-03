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
  const fullAboutText = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis consequuntur doloribus eius 
    ducimus accusamus magni quo blanditiis est autem recusandae. Nulla laboriosam, veritatis necessitatibus 
    expedita officia maxime dolorum obcaecati itaque repudiandae expedita alias facere quos!`;
  const truncatedAboutText = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis consequuntur doloribus eius...`;

  return (
    <div className="space-y-4 p-2 md:px-5">
      {/* Header Section */}
      <div className="space-y-1 px-3 md:px-0">
        <h2 className="text-xl font-extrabold text-start text-gray-800">
          The Child Unplugged
        </h2>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <BiHappyAlt className="text-yellow-500" size={28} />
          <strong>4.5</strong>
          <span className="text-sm text-slate-500">(554 ratings)</span>
        </div>
        <p className="text-[13px] w-full text-gray-500 font-medium">
          Dubai, United Arab Emirates
        </p>
      </div>

      <div className="space-y-5 hidden md:block">
        {/* Chat Button */}
        <Button
          className="w-full rounded-3xl h-12 flex items-center justify-center gap-3 border-2"
          type="default"
        >
          <FaWhatsapp className="w-6 h-6 text-green-500" />
          <span className="text-base font-semibold text-gray-700">Chat to Shop</span>
        </Button>

        {/* About Section */}
        <div className="space-y-2">
          <h3 className="text-[16px] font-semibold text-gray-800 border-b pb-2">
            About Us
          </h3>
          <div className="flex gap-3 items-start">
            <p className="text-black text-[12px] leading-relaxed">
              {showAbout ? fullAboutText : truncatedAboutText}
            </p>
            <FaChevronDown
              onClick={() => setShowAbout(!showAbout)}
              size={36}
              className={`cursor-pointer transform transition duration-300 ${showAbout ? "rotate-180" : ""}`}
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <FaInternetExplorer className="w-5 h-5" />
              <span className="text-sm">www.childunplugged.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 hover:text-pink-600 cursor-pointer">
              <FaInstagram className="w-5 h-5" />
              <span className="text-sm">@childunplugged</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 hover:text-blue-700 cursor-pointer">
              <FaFacebook className="w-5 h-5" />
              <span className="text-sm">ChildUnpluggedOfficial</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="flex gap-2 text-[16px]">
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
