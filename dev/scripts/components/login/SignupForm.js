import React from 'react';

export const SignupForm = (props) => {
  return (
    <div className="signup">
      <h1 className="signup--header">Sign Up</h1>
      <p className="signup--descr">Track your project documents in one place.</p>
      <form className="signup--form">
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
        <label>
          Re-enter Password:
          <input
            name="rePassword"
            type="password"
            onChange={props.handleOnChange}
            value={props.rePassword} />
        </label>
      </form>
      <div>
        <button onClick={props.createUser}>Save</button>
        <button onClick={props.toggleFormType}>Cancel</button>
      </div>
    </div>
  );
}
