import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    username: '',
    contact_number: '',
    address: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for username: only letters
    if (name === 'username' && !/^[a-zA-Z]*$/.test(value)) {
      return; // Do not update state if username contains non-letter characters
    }

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const sendData = async (e) => {
    e.preventDefault();

    // Password validation: at least 6 characters and at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(user.password)) {
      alert('Password must be at least 6 characters long and contain at least one special character');
      return;
    }

    // Contact number validation: must be exactly 10 digits
    if (user.contact_number.length !== 10 || isNaN(user.contact_number)) {
      alert('Contact number must be 10 digits long and contain only numbers');
      return;
    }

    try {
      await sendRequest();
      alert("Registration successful");
      history(`/myaccount?username=${user.username}&email=${user.email}&contact_number=${user.contact_number}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/user/add", {
      username: user.username,
      contact_number: user.contact_number,
      address: user.address,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className='con'style={{ backgroundColor: "#f1f5f9" }} >
      <div className="container">
        <form onSubmit={sendData}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter name"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contact_number"
              name="contact_number"
              placeholder="Enter Contact Number"
              value={user.contact_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
