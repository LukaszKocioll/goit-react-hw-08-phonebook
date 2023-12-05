import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Username: 
          <input
            type="text"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
        </label>
        <label>
          Password: 
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
