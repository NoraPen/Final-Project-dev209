// src/components/AuthForm.js
import React from 'react';

function AuthForm({
  title,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  buttonText,
  errorMessage,
  children
}) {
  return (
    <main className="auth-page">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button type="submit">{buttonText}</button>
        {errorMessage && <p className="login-error-message">{errorMessage}</p>}
      </form>
      {children}
    </main>
  );
}

export default AuthForm;