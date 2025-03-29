'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import CryptoJS from 'crypto-js'; // Assuming AES encryption is used

const { Option } = Select;

const divisionMap = {
  Chattagram: 1,
  Rajshahi: 2,
  Khulna: 3,
  Barisal: 4,
  Sylhet: 5,
  Dhaka: 6,
  Rangpur: 7,
  Mymensingh: 8
};

const CheckoutContent = () => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loadingDivisions, setLoadingDivisions] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loading,setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([]);
  const searchParams = useSearchParams();
  const encryptedData = searchParams.get("data");

  // Decryption Function (Assuming AES encryption)
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


  const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  
  useEffect(() => {
    setLoading(false)
    const fetchDivisions = async () => {
      try {
        const response = await axios.get('https://bdapi.vercel.app/api/v.1/division');
        setDivisions(response.data.data);
      } catch (error) {
        console.error('Error fetching divisions:', error);
        message.error('Failed to load divisions');
      } finally {
        setLoadingDivisions(false);
      }
    };
    fetchDivisions();
  }, []);

  const handleDivisionChange = async (value) => {
    form.setFieldsValue({ district: undefined });

    const divisionId = divisionMap[value];
    if (!divisionId) return;

    try {
      setLoadingDistricts(true);
      const response = await axios.get(`https://bdapi.vercel.app/api/v.1/district/${divisionId}`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Failed to load districts');
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleSubmit = (values) => {
    const formData = {
      ...values,
      total: newTotal || 0,
      data: cartItems,
    };
  
    fetch("https://server-sijans-projects-f3bcab8f.vercel.app/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
      // Ensure success response
          enqueueSnackbar("🎉 Order has been placed successfully!", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            autoHideDuration: 4000,
            style: {
              backgroundColor: "#10B981",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          });
  
          // Clear cart and redirect after 3s
          localStorage.removeItem("shopping-cart1");
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
       
      })
      .catch((error) => {
        enqueueSnackbar(`❌ ${error.message || "Something went wrong!"}`, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 4000,
          style: {
            backgroundColor: "#EF4444", // Tailwind red-500
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        });
      });
  
    console.log("Final Checkout Data:", formData);
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:px-2 sm:px-6 lg:px-8">
       <SnackbarProvider />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-yellow-600 to-indigo-600">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            <span className="mr-2"></span>
            Complete Your Order
          </h2>
          <p className="text-center text-blue-100 text-sm">
            Please fill in your details to complete the purchase
          </p>
        </div>

        <div className="px-8 py-10">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item className='font-semibold' name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item name="phone" className='font-semibold' label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                  <Input placeholder="01XXXXXXXXX" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item name="division" className='font-semibold' label="Division" rules={[{ required: true, message: 'Please select division' }]}>
                  <Select
                    placeholder="Select Division"
                    onChange={handleDivisionChange}
                    loading={loadingDivisions}
                    notFoundContent={loadingDivisions ? <Spin size="small" /> : 'No divisions found'}
                  >
                    {divisions.map((division) => (
                      <Option key={division._id} value={division.name}>
                        {division.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="district" className='font-semibold' label="District" rules={[{ required: true, message: 'Please select district' }]}>
                  <Select
                    placeholder="Select District"
                    loading={loadingDistricts}
                    disabled={!districts.length}
                    notFoundContent={loadingDistricts ? <Spin size="small" /> : 'Select division first'}
                  >
                    {districts.map((district) => (
                      <Option key={district._id} value={district.name}>
                        {district.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item name="address" className='font-semibold' label="Home Address" rules={[{ required: true, message: 'Please enter your home address' }]}>
                <Input.TextArea rows={4} placeholder="House #12, Road #5, Dhanmondi R/A, Dhaka" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-52 mx-auto flex justify-center items-center">
                  Complete Checkout →
                </Button>
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