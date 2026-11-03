import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const {
    cart,
    incrementQty,
    decrementQty,
    removeItem,
    clearCart,
    totalAmount,
    totalQty,
  } = useCart();

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>

      {!cart || cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="row">
            {cart.map((p) => (
              <div className="col-md-6 mb-3" key={p._id}>
                <div className="card shadow-sm p-2">
                  <div className="d-flex gap-3 align-items-center">
                    <div style={{ width: 110 }}>
                      {p.image ? (
                        <img
                          src={`http://localhost:5000/${p.image}`}
                          alt={p.name}
                          style={{
                            width: "100%",
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: 80,
                            background: "#eee",
                            borderRadius: 6,
                          }}
                        />
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="mb-1">{p.name}</h6>
                          <small className="text-muted">{p.category}</small>
                        </div>
                        <div className="text-end">
                          <b>₹{Number(p.price).toFixed(2)}</b>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mt-2 gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => decrementQty(p._id)}
                        >
                          −
                        </button>
                        <div className="px-3 py-1 border rounded">{p.qty}</div>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => incrementQty(p._id)}
                        >
                          +
                        </button>

                        <div className="ms-auto fw-bold">
                          ₹{(p.price * p.qty).toFixed(2)}
                        </div>
                      </div>

                      <div className="mt-2 text-end">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end">
            <div className="card p-3" style={{ minWidth: 300 }}>
              <div className="d-flex justify-content-between">
                <span>Total items</span>
                <b>{totalQty}</b>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total amount</span>
                <b>₹{totalAmount.toFixed(2)}</b>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-warning" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/pay" className="btn btn-success">
                  Proceed to Payment
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
