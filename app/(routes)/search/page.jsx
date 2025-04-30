'use client'
import { useAppContext } from '@/app/context/AppContext';
import React, { useState } from 'react';
import { Input, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const { data } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Discover Our Collection
          </h1>
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Search for products..."
              size="large"
              allowClear
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                padding: '1rem 2rem',
                border: '2px solid #e5e7eb',
              }}
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
                <div
  key={product._id}
  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 border border-gray-100"
>
  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
    <img
      src={product.img}
      alt={product.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
    />
    {product.bestSells === "yes" && (
      <div className="absolute top-3 right-3 backdrop-blur-sm bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-emerald-700">
        ⭐ Best Seller
      </div>
    )}
  </div>
  
  <div className="p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {product.brand}
      </span>
      <span className="text-xs font-medium text-gray-400">
        #{product.id}
      </span>
    </div>
    
    <h3 className="text-xl/none font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
      {product.title}
    </h3>
    
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-extrabold text-gray-900">
        ${product.price}
        <span className="text-sm font-normal text-gray-400 ml-1">TK</span>
      </span>
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <span className="w-2 h-2 rounded-full" style={{backgroundColor: product.color.toLowerCase()}} />
        {product.color}
      </span>
    </div>
    
    <div className="flex items-center justify-between text-sm">
      <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
        <span className="text-gray-500">Category:</span>
        <span className="font-medium text-gray-700">
          {product.category}
        </span>
      </div>
      <button 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white p-2 rounded-full hover:bg-gray-800"
        onClick={() => handleQuickView(product)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      </button>
    </div>
  </div>
</div>
            ))}
          </div>
        ) : (
          <Empty
            description={
              <span className="text-gray-500 text-lg">
                No products found matching your search
              </span>
            }
            className="flex flex-col items-center justify-center py-24"
          >
            <img
              src="/empty-state.svg"
              alt="Empty"
              className="h-48 w-48 mb-8 opacity-75"
            />
          </Empty>
        )}
      </div>
    </div>
  );
};

export default Page;