import React, { useState } from 'react';

function Signup() {
	const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState(false);

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
  };

	const checkPassword = () => {
		if (password === confirmPassword) {
			setPasswordCheck(true);
		} else {
			setPasswordCheck(false);
		}
	};

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form'>

        <label className='form-label'>
          Username: <span style={{color: "#e34234"}}>*</span>
        </label>
          <input className="form-input" type="text" value={userName} onChange={handleUserNameChange} />
        <br />

        <label className='form-label'>
      		Password <span style={{color: "#e34234"}}>*</span>
        </label>
          <textarea value={password} onChange={handlePasswordChange} />

        <label className='form-label'>
      		Confirm Password <span style={{color: "#e34234"}}>*</span>
        </label>
          <textarea value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <br />
				<p className="login-text">Don't have an account? <a className="signup-atag" href="/signup">Sign up</a></p>
				<br />
        <button type="submit" disabled={passwordCheck}>
          Submit
        </button>
      </form>
    </div>
	);
}


export default Signup;
