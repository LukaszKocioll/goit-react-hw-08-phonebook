import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../api/contactsApi';

const AuthenticationPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(true);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username: loginData.username, password: loginData.password });
      if (response.error) {
        console.error('Login failed', response.error);
        alert('Błędne hasło lub login');
      } else if (response.data.length > 0) {
        console.log('Login successful', response.data);
        alert('Zalogowano pomyślnie!');
      } else {
        console.error('Unexpected response', response);
        alert('Wystąpił nieoczekiwany błąd podczas logowania');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Wystąpił błąd podczas logowania');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerData);
      if (response.error) {
        console.error('Registration failed', response.error);
        alert('Błąd podczas rejestracji');
      } else {
        console.log('Registration successful', response.data);
        alert('Zarejestrowano pomyślnie!');
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Wystąpił błąd podczas rejestracji');
    }
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div>
      <div>
        <button onClick={toggleForm}>Login</button>
        <button onClick={toggleForm}>Register</button>
      </div>

      {showLoginForm ? (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>Username: <input type="text" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} /></label>
            <label>Password: <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} /></label>
            <button type="submit" disabled={isLoggingIn}>Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Register Form</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label>Username: <input type="text" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} /></label>
            <label>Password: <input type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} /></label>
            <button type="submit" disabled={isRegistering}>Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
