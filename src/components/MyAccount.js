import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MyAccount() {
  const { email } = useParams(); // Retrieve email from URL parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [updatedUser, setUpdatedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUserDetails(email);
  }, [email]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8070/user/MyAccount/${email}`);
      setUser(response.data.User);
      // Initialize updatedUser state with the fetched user data
      setUpdatedUser(response.data.User);
    } catch (error) {
      setError('Error fetching user details');
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    // Update the corresponding field in the updatedUser state
    setUpdatedUser({
      ...updatedUser,
      [field]: value
    });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8070/user/update/${user._id}`, updatedUser);
      setSuccessMessage('User details updated successfully');
      // Update the user state with the updated user details
      setUser(updatedUser);
    } catch (error) {
      setError('Error updating user details');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          {error && <p>{error}</p>}
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="con" style={{ backgroundColor: "#f1f5f9" }}>
    <div className="container">
      <h2>User Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <td><strong>Username:</strong></td>
            <td>
              <input
                type="text"
                className="form-control"
                value={updatedUser.username}
                onChange={(e) => handleInputChange(e, 'username')}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Contact Number:</strong></td>
            <td>
              <input
                type="text"
                className="form-control"
                value={updatedUser.contact_number}
                onChange={(e) => handleInputChange(e, 'contact_number')}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>
              <input
                type="text"
                className="form-control"
                value={updatedUser.address}
                onChange={(e) => handleInputChange(e, 'address')}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>
              <input
                type="email"
                className="form-control"
                value={updatedUser.email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Password:</strong></td>
            <td>
              <input
                type="password"
                className="form-control"
                value={updatedUser.password}
                onChange={(e) => handleInputChange(e, 'password')}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleUpdateUser} className="btn btn-primary">Update</button>
      {successMessage && <p className="mt-3">{successMessage}</p>}
    </div>
    </div>
  );
}

export default MyAccount;
