import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders ❌");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Your Orders</h3>
      <hr />

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="mt-3">
          {orders.map((order, index) => (
            <div key={order._id} className="card p-3 mb-3 shadow-sm">
              <h5>Order #{index + 1}</h5>

              {order.items.map((item) => (
                <div key={item.productId} className="ms-3">
                  <p>
                    {item.name} — {item.qty} × ₹{item.price} ={" "}
                    <b>₹{item.total}</b>
                  </p>
                </div>
              ))}

              <h6 className="text-end">
                Total: <b>₹{order.totalAmount}</b>
              </h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
