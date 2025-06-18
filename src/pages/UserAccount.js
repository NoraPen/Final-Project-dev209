// src/pages/UserAccount.js
import React from 'react';
import '../style.css';
import '../pages.css';

function UserAccount() {
  return (
    <main className="account-page">
      <header className="page-header">
        <div className="container">
          <h2>My Account</h2>
          <p className="page-description">Manage your account details, orders, and preferences.</p>
        </div>
      </header>

      <section className="container account-section">
        <div className="account-card">
          <h3>Account Details</h3>
          <p><strong>Name:</strong> Jane Doe</p>
          <p><strong>Email:</strong> janedoe@example.com</p>
          <button className="btn">Edit Profile</button>
        </div>

        <div className="account-card">
          <h3>Order History</h3>
          <p>No recent orders.</p>
        </div>
      </section>
    </main>
  );
}

export default UserAccount;
