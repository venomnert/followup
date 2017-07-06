import React from 'react';

export const NavBar = (props) => {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <i onClick={props.handleClick} className="fa fa-bars" aria-hidden="true"></i>
      </nav>
    </div>
  );
}
