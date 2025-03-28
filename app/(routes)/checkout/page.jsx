'use client'
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

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

const Checkout = () => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loadingDivisions, setLoadingDivisions] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const searchParams = useSearchParams();
  const total = searchParams.get('total');

  useEffect(() => {
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
    form.setFieldsValue({ district: undefined }); // Reset district field

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

  return (
    <div className="min-h-screen py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-yellow-600 to-indigo-600">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            <span className="mr-2">🏠</span>
            Complete Your Order
          </h2>
          <p className="text-center text-blue-100 text-sm">
            Please fill in your details to complete the purchase
          </p>
        </div>

        <div className="px-8 py-10">
          <Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input placeholder="01XXXXXXXXX" />
                </Form.Item>
              </div>

              {/* Location Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="division"
                  label="Division"
                  rules={[{ required: true, message: 'Please select division' }]}
                >
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

                <Form.Item
                  name="district"
                  label="District"
                  rules={[{ required: true, message: 'Please select district' }]}
                >
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

              {/* Address */}
              <Form.Item
                name="address"
                label="Home Address"
                rules={[{ required: true, message: 'Please enter your home address' }]}
              >
                <Input.TextArea rows={4} placeholder="House #12, Road #5, Dhanmondi R/A, Dhaka" />
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
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

export default Checkout;
