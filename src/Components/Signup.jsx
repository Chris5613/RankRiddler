import React, { useState } from 'react';

function Signup() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      // Submit form data here
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

				<label className='form-label'>
					Password <span style={{color: "#e34234"}}>*</span>
				</label>
				<input className="form-input" type="password" value={password} onChange={handlePasswordChange} />


				<label className='form-label'>
					Confirm Password <span style={{color: "#e34234"}}>*</span>
				</label>
				<input className="form-input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

        <br />
        <p className="login-text">
          Already have a account?{' '}
          <a className="signup-atag" href="/login">
            Login
          </a>
        </p>
        <br />		
        {!passwordsMatch && (
          <p className="error-message">Passwords do not match!</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
