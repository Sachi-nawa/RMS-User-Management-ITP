import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

function Register() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/user/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8070/user/delete/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      alert('Customer deleted successfully.');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer.');
    }
  };

  const saveChanges = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8070/user/update/${id}`, updatedData);
      fetchCustomers();
      alert('Customer details updated successfully.');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer details.');
    }
  };

  const handleUpdateClick = (customerId) => {
    setEditingCustomerId(customerId);
  };

  const handleInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === editingCustomerId ? { ...customer, [field]: updatedValue } : customer
      )
    );
  };

  const handleSaveClick = async (customerId) => {
    const updatedCustomer = customers.find((customer) => customer._id === customerId);
    await saveChanges(customerId, updatedCustomer);
    setEditingCustomerId(null);
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text('Filtered Customer Details', 10, 10);
    let yPos = 20;
    let rowCount = 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Row', 10, yPos);
    doc.text('Username', 30, yPos);
    doc.text('Contact Number', 70, yPos);
    doc.text('Address', 110, yPos);
    doc.text('Email', 150, yPos);
   // doc.text('Birth', 190, yPos);
    yPos += 10;

    doc.setFont('helvetica', '');
    doc.setFontSize(10);
    const filteredCustomers = customers.filter((customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredCustomers.forEach((customer) => {
      doc.text(`${rowCount}`, 10, yPos);
      doc.text(customer.username, 30, yPos);
      doc.text(customer.contact_number, 70, yPos);
      doc.text(customer.address, 110, yPos);
      doc.text(customer.email, 150, yPos);
     // doc.text(customer.birth, 190, yPos);
      yPos += 10;
      rowCount++;
    });

    const totalCustomers = filteredCustomers.length;
    doc.text(`Total Customers: ${totalCustomers}`, 10, yPos + 10);

    doc.save('All_customer_details.pdf');
  };

  return (
    <div className="con" style={{ backgroundColor: "#f1f5f9" }}>
      <div className="container1">
        <h2>Customer Details</h2>
        <div className="mb-3" style={{ marginTop: '50px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <button className="btn btn-sm btn-danger ms-2" onClick={handlePDFDownload}>
            Download PDF
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Email</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter((customer) =>
                customer.username.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((customer) => (
                <tr key={customer._id}>
                  <td>
                    {editingCustomerId === customer._id ? (
                      <input
                        type="text"
                        value={customer.username}
                        onChange={(e) => handleInputChange(e, 'username')}
                      />
                    ) : (
                      customer.username
                    )}
                  </td>
                  <td>
                    {editingCustomerId === customer._id ? (
                      <input
                        type="text"
                        value={customer.contact_number}
                        onChange={(e) => handleInputChange(e, 'contact_number')}
                      />
                    ) : (
                      customer.contact_number
                    )}
                  </td>
                  <td>
                    {editingCustomerId === customer._id ? (
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => handleInputChange(e, 'address')}
                      />
                    ) : (
                      customer.address
                    )}
                  </td>
                  <td>
                    {editingCustomerId === customer._id ? (
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                    ) : (
                      customer.email
                    )}
                  </td>
               
                 
                 
                  <td className="text-center">
                    {editingCustomerId === customer._id ? (
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => handleSaveClick(customer._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => handleUpdateClick(customer._id)}
                      >
                        Update
                      </button>
                    )}
                    <button
                      className="btn btn-danger ms-2 "
                      onClick={() => deleteCustomer(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Total Customers: {customers.length}</p>
          </div>
        </div>
        <div>
      <nav class="sidebar">
  <span class="sidebar-title">Account Dashboard</span>
  <ul class="sidebar-links">
    <li class="sidebar-item">
      <a href="/" class="sidebar-link">
        Admin Home
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/payment" class="sidebar-link">
        Payment
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/view-reviews" class="sidebar-link">
        Reviews
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/services" class="sidebar-link">
        services
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/view-reviews" class="sidebar-link">
        Reviews
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/services" class="sidebar-link">
        services
      </a>
    </li>
    <li class="sidebar-item">
      <a href="/logout" class="sidebar-link">
        Logout
      </a>
    </li>
  </ul>
</nav>
    </div>
      </div>
    </div>
    </div>

  );
}

export default Register;
