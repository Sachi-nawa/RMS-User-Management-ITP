import React, { useState } from "react";
import axios from "axios";

export default function AddCus() {
  const [username, setUsername] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();

    // Validate contact number length
    if (contact_number.length !== 10) {
      alert("Contact number must be 10 digits long");
      return;
    }

    // Validate password for special characters
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }

    // Validate username for only letters
    const lettersOnly = /^[a-zA-Z\s]*$/;
    if (!lettersOnly.test(username)) {
      alert("Username must contain only letters");
      return;
    }

    // Validate address for only letters and spaces
    if (!lettersOnly.test(address)) {
      alert("Address must contain only letters and spaces");
      return;
    }

    const newCustomer = {
      username,
      contact_number,
      address,
      email,
      password,
    };

    axios
      .post("http://localhost:8070/user/add", newCustomer)
      .then(() => {
        alert("Customer added");

        setUsername("");
        setContact_number("");
        setAddress("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert("Error");
      });
  }

  return (
    <div className="con1" style={{ backgroundColor: "#f1f5f9" }}>
    <div className="container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="contact_number"
            placeholder="Enter Contact Number"
            value={contact_number}
            onChange={(e) => {
              setContact_number(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}
