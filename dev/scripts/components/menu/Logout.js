import React from 'react';

export const Logout = (props) => {
  return (
    <button
      onClick={props.handleLogout}
      className="logout">Logout</button>
  );
}
