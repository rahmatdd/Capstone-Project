import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  updateCartItemQuantity,
  checkout,
} from '../redux/actions/cartActions';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({}); 

  const handleCheck = (productId, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [productId]: isChecked,
    }));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    dispatch(updateCartItemQuantity(productId, newQuantity));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const quantity = quantities[item.id] || item.quantity;
      return checkedItems[item.id] ? total + item.price * quantity : total;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => {
      const quantity = quantities[item.id] || item.quantity;
      return checkedItems[item.id] ? total + quantity : total;
    }, 0);
  };

  const handleCheckout = () => {
    const checkoutItems = items.filter(
      (item) => checkedItems[item.id] && (quantities[item.id] || item.quantity) <= 20
    );

    dispatch(checkout(checkoutItems));
    alert('Checkout berhasil!');
    navigate('/');
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Anda belum memilih item</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">Keranjang Belanja</h2>
      {items.map((item) => {
        const currentQuantity = quantities[item.id] || item.quantity;
        const isChecked = checkedItems[item.id] || false;
        return (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCartHandler}
            onCheck={handleCheck}
            isChecked={isChecked} 
            currentQuantity={currentQuantity}
          />
        );
      })}

      <div className="mt-4">
        <h3>
          Total: $ {calculateTotal().toLocaleString()} ({calculateTotalQuantity()})
        </h3>
        <button
          className="btn btn-success btn-lg"
          onClick={handleCheckout}
          disabled={!Object.values(checkedItems).some((val) => val)} 
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
