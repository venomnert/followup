import React from 'react';

export const Logout = (props) => {
  return (
    <button
      onClick={props.handleLogout}
      className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
  );
}
