"use client";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {clicked, setClicked} = useAppContext()

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart1")) || [];
   
    setCartItems(storedCart);
   
  }, [clicked]);


  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("shopping-cart1", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0); // Remove items with quantity 0
      setClicked(!clicked)
    setCartItems(updatedCart);
    localStorage.setItem('shopping-cart1', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setClicked(!clicked)
    localStorage.setItem("shopping-cart1", JSON.stringify(updatedCart));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
<div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-xl text-black  font-semibold mb-4">
    Shopping Cart <span className="text-orange-500">({cartItems.length} items)</span>
  </h2>

  {cartItems.length === 0 ? (
    <p className="text-center text-gray-500">Your cart is empty.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border hidden md:table">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border text-black p-2">Image</th>
            <th className="border text-black p-2">Product</th>
            <th className="border text-black p-2">Quantity</th>
            <th className="border text-black p-2">Price</th>
            <th className="border text-black p-2">Total</th>
            <th className="border text-black p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">
                <img src={item.img} alt={item.title} className="w-12 h-12" />
              </td>
              <td className="border text-black  p-2">{item.name}</td>
              <td className="border p-2 flex text-black  justify-center  items-center">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 text-black  rounded"
                >
                  −
                </button>
                <span className="mx-2 text-black ">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 text-black  rounded"
                >
                  +
                </button>
              </td>
              <td className="border p-2 text-orange-500">AED {item.price}</td>
              <td className="border p-2 text-orange-500">AED {item.price * item.quantity}</td>
              <td className="border p-2">
                <button onClick={() => removeItem(item.id)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden text-black  space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-orange-500">AED {item.price}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  −
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-orange-500 font-semibold">Total: AED {item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.id)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Order Summary */}
  <div className="mt-6 bg-gray-100 text-black  p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">ORDER SUMMARY</h3>
    {cartItems.map((item) => (
      <p key={item.id} className="flex justify-between">
        {item.title} x{item.quantity} <span className="text-orange-500">AED {item.price * item.quantity}</span>
      </p>
    ))}
    <hr className="my-2" />
    <p className="flex justify-between text-lg font-semibold">
      Subtotal <span className="text-orange-500">AED {subtotal}</span>
    </p>
    <button className="mt-3 w-full md:w-72 mx-auto flex justify-center items-center bg-slate-500 text-white py-2 rounded-lg hover:bg-blue-600">
      Request Order
    </button>
  </div>
</div>

  );
};

export default CartPage;
