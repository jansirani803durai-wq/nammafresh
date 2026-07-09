import React, { useEffect, useState } from "react";
import axios from "axios";
import API from '../api.js';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get(`${API}/orders/history/`)
      .then((res) => setOrders(res.data))
      .catch(console.error);
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Remove this order from history?")) return;

    try {
      await axios.delete(`${API}/orders/${id}/delete/`);

      setOrders((prev) => prev.filter((o) => o.id !== id));

      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
    } catch (err) {
      alert("Unable to delete order.");
    }
  };

  return (
    <main className="page">
      <h1 data-aos="fade-up">Order History</h1>

      {orders.length === 0 ? (
        <div className="empty">No Orders Found</div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
            data-aos="fade-up"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() =>
                setSelectedOrder(
                  selectedOrder?.id === order.id ? null : order
                )
              }
            >
              <div>
                <h3>Order #{order.id}</h3>

                <p>
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </p>

                <p>{order.payment_status}</p>

                <p>
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <button className="btn">
                {selectedOrder?.id === order.id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>

            {selectedOrder?.id === order.id && (
              <div
                style={{
                  marginTop: 20,
                  borderTop: "1px solid #ddd",
                  paddingTop: 15,
                }}
              >
                <p>
                  <b>Name:</b> {order.full_name}
                </p>

                <p>
                  <b>Email:</b> {order.email}
                </p>

                <p>
                  <b>Phone:</b> {order.phone}
                </p>

                <p>
                  <b>Address:</b> {order.address}
                </p>

                <p>
                  <b>Payment:</b> {order.payment_status}
                </p>

                {order.razorpay_payment_id && (
                  <p>
                    <b>Payment ID:</b>{" "}
                    {order.razorpay_payment_id}
                  </p>
                )}

                <h4>Products</h4>

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span>{item.product_name}</span>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}

                <button
                  className="btn btn-danger"
                  onClick={() => deleteOrder(order.id)}
                  style={{ marginTop: 15 }}
                >
                  Remove Order
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
}
