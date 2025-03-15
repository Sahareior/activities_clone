import React from "react";

const ProductCard = ({ product, handleClick }) => {
  return (
    <div className="w-full md:max-w-[180px] shadow-md flex flex-row md:flex-col items-center mt-4 p-2 rounded-lg gap-3">
      {/* Product Image */}
      <div className="w-[190px] h-[120px] md:w-full  md:h-[160px] overflow-hidden rounded-lg flex justify-center">
        <img
          onClick={() => handleClick(product)}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-1/2 md:w-full justify-center">
        <p className="text-[13px] mreg text-gray-800 leading-tight">
          {product.name.length > 35 ? product.name.slice(0, 35) + "..." : product.name}
        </p>
        <p className="text-[13px] mmed mt-2 font-semibold text-gray-600">
  {`AED ${Number(product.price || 0).toFixed(2)}`}
</p>

      </div>
    </div>
  );
};

export default ProductCard;
