import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundGif from "../assets/images/play.gif";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID); // Save the userID
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };


  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the Register page
  };

  return (
      <div className="login-page" style={{
          backgroundImage: `url(${backgroundGif})`,
      }}>
          <h1 className={`game-title`}>
              WonderCards
          </h1>
    <form onSubmit={handleSubmit} className="login-box">
      <h2>Login</h2>
        <div className="login-inputs">
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
        </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button data-testid="login-button" type="submit" disabled={!formData.password || !formData.username}>Login</button>
        <button data-testid="register-button" type="button" onClick={handleRegisterRedirect}>
          Register
        </button>
      </div>
      <p style={{ color: 'red' }}>{error}</p>
    </form>
      </div>
  );
};

export default Login;
