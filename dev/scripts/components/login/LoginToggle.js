import React from 'react';

export const LoginToggle = (props) => {
  return (
    <div className="login--toggle">
      <button
        onClick={props.loginUser}
        className="toggle--login">Log In</button>
      <button
        onClick={props.toggleFormType}
        className="toggle--signup">Sign Up</button>
    </div>
  );
}
