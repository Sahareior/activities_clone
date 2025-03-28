'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Button, Empty } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { ShoppingCartOutlined, ArrowLeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

const CartModal = ({ isModalVisible, handleOk, handleCancel }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { clicked, setClicked } = useAppContext();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shopping-cart1')) || [];
    setCartItems(storedCart);
  }, [isModalVisible, clicked]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const increaseQty = (_id) => {
    const updatedCart = cartItems.map(item =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('shopping-cart1', JSON.stringify(updatedCart));
  };

  const decreaseQty = (_id) => {
    const updatedCart = cartItems
      .map(item =>
        item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    setClicked(!clicked);
    setCartItems(updatedCart);
    localStorage.setItem('shopping-cart1', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined className="text-blue-600 text-xl" />
          <h2 className="text-lg font-bold text-gray-800 m-0">Your Shopping Cart</h2>
        </div>
      }
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="cart-modal"
      closeIcon={<span className="text-gray-500 hover:text-gray-700">✕</span>}
    >
      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div 
                key={item._id} 
                className="flex justify-between items-center p-3 mb-3 rounded-lg transition-all duration-200 hover:bg-gray-50 group"
              >
                <div className="flex gap-4 items-center">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className='text-gray-800 font-semibold text-base'>{item.name}</h3>
                    <p className="text-gray-600 text-sm">Price: {Number(item.price).toFixed(2)} TK</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm">
                        <Button 
                          shape="circle" 
                          size="small"
                          icon={<MinusOutlined className="text-xs" />}
                          onClick={() => decreaseQty(item._id)}
                          className="hover:bg-gray-100 border-none"
                        />
                        <span className="px-3 text-gray-700 font-medium">{item.quantity}</span>
                        <Button 
                          shape="circle" 
                          size="small"
                          icon={<PlusOutlined className="text-xs" />}
                          onClick={() => increaseQty(item._id)}
                          className="hover:bg-gray-100 border-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-gray-700 font-medium text-sm">
                    {(item.price * item.quantity).toFixed(2)} TK
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Empty
            image={<ShoppingCartOutlined className="text-4xl text-gray-400" />}
            imageStyle={{ height: 60 }}
            description={
              <span className="text-gray-500">Your cart is empty. Start shopping!</span>
            }
            className="py-8"
          />
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Subtotal:</span>
            <span className="text-gray-800 font-semibold">{Number(subtotal).toFixed(2)} TK</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total (incl. VAT):</span>
            <span className="text-blue-600 font-bold text-lg">{Number(total).toFixed(2)} TK</span>
          </div>
          <div className="flex flex-col gap-3">
          <Button
  type="primary"
  size="large"
  onClick={() => {
    router.push(`/checkout?total=${total.toFixed(2)}`);
    handleCancel(); // Close the modal
  }}
  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold h-12 rounded-lg shadow-md transition-all"
>
  Proceed to Checkout
</Button>

            <Button
              onClick={handleCancel}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium h-10 rounded-lg border border-gray-300 hover:border-blue-500 transition-all"
            >
              <ArrowLeftOutlined />
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;