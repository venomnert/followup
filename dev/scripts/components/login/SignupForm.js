import React from 'react';

export const SignupForm = (props) => {
  return (
    <div className="signup">
      <h1 className="signup__header">Sign Up</h1>
      <form className="signup__form">
        <input
          className="signup__form-email"
          placeholder="Email Address"
          name="email"
          type="text"
          onChange={props.handleOnChange}
          value={props.email} />
        <input
          className="signup__form-password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={props.handleOnChange}
          value={props.password} />
        <input
          className="signup__form-rePassword"
          placeholder="Re-enter Password"
          name="rePassword"
          type="password"
          onChange={props.handleOnChange}
          value={props.rePassword} />
      </form>
      <div className="signup__btns">
        <button
          className="signup__save-btn"
          onClick={props.createUser}>Save</button>
        <button
          className="signup__cancel-btn"
          onClick={props.toggleFormType}>Cancel</button>
      </div>
    </div>
  );
}
