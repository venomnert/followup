import React from 'react';

export const LoginForm = (props) => {
  return (
    <div>
      <h1 className="login--header">Login</h1>
      <p className="login--descr">Track your project documents in one place.</p>
      <form className="login--form">
        <label>
          Email Address:
          <input
            name="email"
            type="text"
            onChange={props.handleOnChange}
            value={props.email} />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            onChange={props.handleOnChange}
            value={props.password} />
          </label>
      </form>
    </div>
  );
}
