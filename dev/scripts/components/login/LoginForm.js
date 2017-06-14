import React from 'react';

export const LoginForm = (props) => {
  return (
    <div className="login__login-form">
      <h1 className="login__header">Login</h1>
      <p className="login__descr">FollowUp when you need to track all your project documents in a single place.</p>
      <form className="login__form">
        <input
          className="login__form-email"
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={props.handleOnChange}
          value={props.email} />
        <input
          className="login__form-password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={props.handleOnChange}
          value={props.password} />
      </form>
    </div>
  );
}
