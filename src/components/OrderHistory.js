import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OrderHistory() {
    // Sample initial order data
    const [orders, setOrders] = useState([
        { id: 1, productName: "Product A", quantity: 2 },
        { id: 2, productName: "Product B", quantity: 1 }
    ]);

    // Function to handle delete order
    const handleDeleteOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    return (
        <div>
            <h2>Order History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Go Back</Link>
        </div>
    );
}

export default OrderHistory;
