import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleRegisterSubmit}>
        <label>
          Username: 
          <input
            type="text"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          />
        </label>
        <label>
          Password: 
          <input
            type="password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
