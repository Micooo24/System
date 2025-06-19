// Simple Login Page Component
import React, { useState } from 'react';
import '../CSS/Login.css'; // You can create this CSS file for styling

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }
    
    // Here you would typically handle authentication
    console.log('Login attempt with:', formData);
    
    // Simulate login success (replace with actual authentication)
    alert('Login successful!');
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="additional-options">
          <a href="/forgot-password">Forgot password?</a>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;