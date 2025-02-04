'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';

const CartModal = ({ isModalVisible, handleOk, handleCancel }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {clicked, setClicked} = useAppContext()
  
  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('shopping-cart1')) || [];
    console.log('Cart Items:', storedCart);
    setCartItems(storedCart);
  }, [isModalVisible,clicked]); // Update cart when modal opens
  
  useEffect(() => {
    setLoading(false);
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('shopping-cart1', JSON.stringify(updatedCart));
  };
  
  // Decrease quantity (removes item if quantity reaches 0)
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
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Add VAT calculation if needed
  
  return (
<Modal
  title="Shopping Cart"
  open={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  footer={[
    <div key={2} className='flex flex-col'>
      <Button className='bg-white p-7' key="back" onClick={handleCancel}>
        Browse More Products
      </Button>,
      <Button className='bg-black text-white p-7' key="submit" type="primary" onClick={handleOk}>
        Checkout
      </Button>
    </div>
  ]}
>
  <div className="max-h-60 ">
    {cartItems.length > 0 ? (
      cartItems.slice(0, 2).map(item => ( // Display only first 2 items
        <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2">
          <div>
            <h3 className='text-black mmed text-[13px]'>{item.name}</h3>
            <div className="flex items-center text-black gap-4 my-2">
              <span className="text-lg font-medium">Qty</span>
              <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                <button className="text-xl px-2" onClick={() => decreaseQty(item.id)}>−</button>
                <span className="px-4 text-lg">{item.quantity}</span>
                <button className="text-xl px-2" onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>
            <p className="text-gray-500">AED {item.price.toFixed(2)}</p>
          </div>
          <img src={item.image} alt={item.name} className="w-20 h-20 mr-4" />
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">Your cart is empty.</p>
    )}
  </div>

  <div className="mt-4 text-black text-right">
      <h3 className="cursor-pointer text-blue-500 hover:underline" onClick={() => router.push('/allcart')}>
        View All
      </h3>
    <div className='flex justify-between'>
      <h2>Subtotal</h2>
      <h3>AED {subtotal.toFixed(2)}</h3>
    </div>
    <hr />
    <div className='flex justify-between'>
      <h2>Total</h2>
      <h3>(incl. VAT): AED {total.toFixed(2)}</h3>
    </div>
  </div>
</Modal>

  );
};

export default CartModal;
