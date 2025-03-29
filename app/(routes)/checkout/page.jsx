'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js';

const CheckoutContent = () => {
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState([]);
  const searchParams = useSearchParams();
  const encryptedData = searchParams.get("data");

  useEffect(() => {
    if (encryptedData) {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), "your-secret-key");
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        setCartItems(JSON.parse(decryptedData));
      } catch (error) {
        console.error("Error decrypting cart data:", error);
      }
    }
  }, [encryptedData]);

  const handleSubmit = async (values) => {
    const formData = {
      ...values,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      data: cartItems,
    };

    try {
      const res = await fetch('https://server-sijans-projects-f3bcab8f.vercel.app/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Order placed successfully!');
        window.location.replace('/');
        localStorage.removeItem('shopping-cart1');
      } else {
        message.error('Failed to place order');
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      message.error("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen py-12 md:px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-yellow-600 to-indigo-600">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Complete Your Order</h2>
          <p className="text-center text-blue-100 text-sm">Please fill in your details to complete the purchase</p>
        </div>

        <div className="px-8 py-10">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="space-y-6">
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input placeholder="01XXXXXXXXX" />
              </Form.Item>

              <Form.Item name="address" label="Home Address" rules={[{ required: true, message: 'Please enter your home address' }]}>
                <Input.TextArea rows={4} placeholder="House #12, Road #5, Dhanmondi R/A, Dhaka" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">Complete Checkout →</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Suspense fallback={<p>Loading checkout...</p>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
