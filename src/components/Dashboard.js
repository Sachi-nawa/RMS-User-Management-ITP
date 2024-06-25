import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { email } = useParams(); // Retrieve email from URL parameters
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Set userEmail state with the retrieved email from URL parameters
    setUserEmail(email);
  }, [email]); // Trigger effect whenever email changes

  const handleMyAccountClick = () => {
    // Navigate to My Account page with email in the URL
    navigate(`/MyAccount/${userEmail}`);
  };

  return (
    <div>
      <nav className="sidebar">
        
        <span className="sidebar-title">Hi Dinali,</span>
        <ul className="sidebar-links">
         
          <li className="sidebar-item">
            <button onClick={handleMyAccountClick} className="btn btn-link sidebar-link">
              My Account
            </button>
          </li>
          <li className="sidebar-item">
            <button onClick={() => navigate("/OrderHistory")} className="btn btn-link sidebar-link">
              Order History
            </button>
          </li>
          <li className="sidebar-item">
            <button onClick={() => navigate("/paymenthistory")} className="btn btn-link sidebar-link">
              Payment History
            </button>
          </li>
          <li className="sidebar-item">
            <button onClick={() => navigate("/services")} className="btn btn-link sidebar-link">
              Services
            </button>
          </li>
          <li className="sidebar-item">
            <button onClick={() => navigate("/logout")} className="btn btn-link sidebar-link">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
