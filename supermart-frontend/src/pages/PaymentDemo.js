import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentDemo() {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      if (cart.length === 0) return alert("Cart empty!");

      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          total: item.price * item.qty,
        })),
        totalAmount,
      };

      await axios.post("http://localhost:5000/api/orders", orderData);

      clearCart();
      alert("Order Confirmed! 🎉");
      navigate("/orders");

    } catch (err) {
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Payment</h3>

        <h5>Total Amount: ₹{totalAmount.toFixed(2)}</h5>

        <button className="btn btn-success w-100 mt-3" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentDemo;
