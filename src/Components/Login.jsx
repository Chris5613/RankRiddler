import React, { useState } from 'react';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ userName, password }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   if (response.ok) {
    //     // TODO: handle successful login
    //   } else {
    //     const { message } = await response.json();
    //     setError(message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Username: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <br />

        <label className="form-label">
          Password <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          required
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {error && <div className="error">{error}</div>}
        <p className="login-text">
          Don't have an account?{' '}
          <a className="signup-atag" href="/signup">
            Sign up
          </a>
        </p>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
