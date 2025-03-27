'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const bangladeshDivisions = {
  'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
  'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Rangamati', 'Bandarban'],
  'Rajshahi': ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj'],
  'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
  'Barishal': ['Barishal', 'Patuakhali', 'Bhola', 'Jhalokati'],
  'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  'Rangpur': ['Rangpur', 'Dinajpur', 'Nilphamari', 'Gaibandha'],
  'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

const Checkout = () => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    setDistricts(bangladeshDivisions[value]);
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-2 sm:px-6 lg:px-8">
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
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
          {/* Personal Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="name"
              label={<span className="text-gray-700 font-medium">Full Name</span>}
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                placeholder="John Doe"
                prefix={<span className="text-gray-400">👤</span>}
                className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="text-gray-700 font-medium">Phone Number</span>}
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                placeholder="01XXXXXXXXX"
                prefix={<span className="text-gray-400">📱</span>}
                className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </Form.Item>
          </div>

          {/* Location Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="division"
              label={<span className="text-gray-700 font-medium">Division</span>}
              rules={[{ required: true, message: 'Please select division' }]}
            >
              <Select
                placeholder="Select Division"
                onChange={handleDivisionChange}
                suffixIcon={<span className="text-blue-600">▼</span>}
                className="rounded-lg border-gray-300 hover:border-blue-400 [&>.ant-select-selector]:h-12 [&>.ant-select-selector]:rounded-lg [&>.ant-select-selector]:border-gray-300"
              >
                {Object.keys(bangladeshDivisions).map(division => (
                  <Option key={division} value={division} className="py-2 hover:bg-blue-50">
                    {division}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="district"
              label={<span className="text-gray-700 font-medium">District</span>}
              rules={[{ required: true, message: 'Please select district' }]}
            >
              <Select
                placeholder="Select District"
                disabled={!selectedDivision}
                suffixIcon={<span className="text-blue-600">▼</span>}
                className="rounded-lg border-gray-300 hover:border-blue-400 [&>.ant-select-selector]:h-12 [&>.ant-select-selector]:rounded-lg"
              >
                {districts.map(district => (
                  <Option key={district} value={district} className="py-2 hover:bg-blue-50">
                    {district}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Address Section */}
          <Form.Item
            name="address"
            label={<span className="text-gray-700 font-medium">Home Address</span>}
            rules={[{ required: true, message: 'Please enter your home address' }]}
          >
            <Input.TextArea 
              rows={4}
              placeholder="House #12, Road #5, Dhanmondi R/A, Dhaka"
              className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              showCount 
              maxLength={200}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
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