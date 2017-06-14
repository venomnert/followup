import React from 'react';

export const LoginToggle = (props) => {
  return (
    <div className="login__toggle">
      <button
        onClick={props.loginUser}
        className="toggle__login">Log In</button>
      <button
        onClick={props.toggleFormType}
        className="toggle__signup">Sign Up</button>
    </div>
  );
}
