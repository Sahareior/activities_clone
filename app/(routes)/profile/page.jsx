'use client';
import React, { useState } from 'react';
import { FaTachometerAlt, FaWallet, FaKey, FaBoxOpen, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import TableMode from './_components/TableMode';
import Address from './_components/Address';

const Dashboard = () => (
  <div className="bg-white p-8 w-full rounded-lg ">
    <h2 className="text-xl text-black font-bold mb-2">
      Hello Annie <span className="text-gray-500 text-lg">(Not Annie? <span className="text-red-500 cursor-pointer">Log Out</span>)</span>
    </h2>
    <p className="text-gray-600 leading-relaxed">
      From your account dashboard, you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
    </p>
  </div>
);

const MyWallet = () => (
  <div className="bg-white p-8 rounded-lg ">
    <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2"><FaWallet /> My Wallet</h2>
    <p className="text-gray-700 text-lg"><strong>Balance:</strong> ৳0</p>
    <button className="mt-4 py-2 px-6 bg-black text-white rounded-md hover:bg-green-600 transition">
      Add Funds
    </button>
  </div>
);

const ResetPassword = () => (
  <div className="bg-white p-8 rounded-lg ">
    <h2 className="text-xl text-black font-bold mb-4 flex items-center gap-2"><FaKey /> Reset Password</h2>
    <div className="flex flex-col gap-4">
      <input type="password" placeholder="New Password" className="w-full p-3 border rounded-md" />
      <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-md" />
      <button className="py-2 w-full bg-black text-white rounded-md hover:bg-gray-800 transition">
        Change Password
      </button>
    </div>
  </div>
);

const ShippingAddress = () => (
  <div className="bg-white p-8 rounded-lg text-center shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-black flex justify-center items-center gap-2"><FaMapMarkerAlt /> Shipping Address</h2>
    <p className="text-gray-600 mb-6">
      Manage your shipping details below. Make sure your address is up to date for smooth deliveries.
    </p>
    <button className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2">
      <FaSignOutAlt /> Logout
    </button>
  </div>
);

const ProfileComponent = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'wallet': return <MyWallet />;
      case 'reset': return <ResetPassword />;
      case 'shipping': return <ShippingAddress />;
      case 'table': return <TableMode />;
      case 'address': return <Address />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col my-8 md:flex-row max-w-5xl gap-7 h-auto md:h-screen bg-white mx-auto shadow-lg rounded-lg p-8">
      {/* Sidebar */}
      <div className="w-full md:w-72">
        <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
          {[ 
            { label: "Dashboard", key: "profile", icon: <FaTachometerAlt /> },
            { label: "My Wallet", key: "wallet", icon: <FaWallet /> },
            { label: "Reset Password", key: "reset", icon: <FaKey /> },
            { label: "Orders Table", key: "table", icon: <FaBoxOpen /> },
            { label: "Address", key: "address", icon: <FaMapMarkerAlt /> },
            { label: "Logout", key: "shipping", icon: <FaSignOutAlt /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveComponent(item.key)}
              className={`w-full flex items-center gap-3 py-3 px-4 text-left rounded-md mt-1 transition font-medium text-[16px] ${
                activeComponent === item.key
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-400 text-gray-700'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-screen md:w-4/5">{renderComponent()}</div>
    </div>
  );
};

export default ProfileComponent;