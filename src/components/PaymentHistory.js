import React, { useState } from 'react';

function PaymentHistory() {
  // Sample initial payment history data
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: '2024-04-28', amount: 100, status: 'Paid' },
    { id: 2, date: '2024-04-29', amount: 150, status: 'Pending' }
  ]);

  // Function to handle delete payment
  const handleDeletePayment = (paymentId) => {
    setPaymentHistory(paymentHistory.filter(payment => payment.id !== paymentId));
  };

  return (
    <div>
      <h2>Payment History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.date}</td>
              <td>${payment.amount}</td>
              <td>{payment.status}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeletePayment(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;
