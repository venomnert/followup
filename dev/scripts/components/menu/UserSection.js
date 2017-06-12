import React from 'react';

export const UserSection = (props) => {
  return (
    <div className="userSection">
      <img
        className="userSection--avatar"
        src="https://api.adorable.io/avatars/150/abott@adorable.png"
        alt="User avatar"/>
      <h3 className="userSection--username">{props.userName}</h3>
    </div>
  );
}
