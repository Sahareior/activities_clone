import { useState } from "react";
import { Rate, Button, message, Form, Input } from "antd";
import { MessageOutlined, StarFilled } from "@ant-design/icons";

const Review = () => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (rating === 0) {
        message.warning("Please select a rating before submitting!");
        return;
      }
      
     
      message.success("Thank you for your review!");
      form.resetFields();
      setRating(0);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mt-11 mx-auto p-6 bg-white rounded-2xl -lg  transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Reviews Section */}
        <div className=" border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <MessageOutlined className="text-2xl text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          </div>
          
          <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-1">
  
            <p className="text-gray-500 text-lg font-medium">Be the first to review this product</p>
          </div>
        </div>

        {/* Review Form */}
        <Form form={form} onFinish={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <MessageOutlined className="text-2xl text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-800">Share Your Feedback</h2>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Your email address will not be published. Required fields are marked *
            </p>
          </div>

          {/* Rating Section */}
          <Form.Item
            name="rating"
            rules={[{ required: true, message: 'Please select a rating!' }]}
          >
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Rate this product *
              </label>
              <Rate
                className="text-3xl [&>.ant-rate-star]:mr-2"
                character={<StarFilled />}
                value={rating}
                onChange={setRating}
                style={{ color: '#f59e0b' }}
              />
            </div>
          </Form.Item>

          {/* Review Textarea */}
          <Form.Item
            name="review"
            rules={[{ required: true, message: 'Please write your review!' }]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Share your experience with this product..."
              className="rounded-lg border-gray-200 hover:border-amber-300 focus:border-amber-400 focus:shadow-lg"
              style={{ resize: 'none' }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="w-full md:w-48 h-12 rounded-lg font-semibold bg-amber-500 hover:bg-amber-600 border-none text-white shadow-md hover:shadow-lg transition-all"
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Review;