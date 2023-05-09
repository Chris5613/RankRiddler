import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';

function Signup() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.username = userName;
    data.password = password;
    const res = await fetch('https://rr-back-end.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      alert('Signed up successfully!');
      navigate('/login');
    } else {
      alert('Username already exists');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Username: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          required
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <br />

        <label className="form-label">
          Password <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />
        <p className="login-text">
          Already have a account?{' '}
          <NavLink className="signup-atag" href="/login">
            Login
          </NavLink>
        </p>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
