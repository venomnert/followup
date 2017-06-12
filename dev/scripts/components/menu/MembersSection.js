import React from 'react';

export const MembersSection = (props) => {
  return (
    <ul className="membersSection">
      <li className="membersSection--members">
        <a href="/members" onClick={props.handleLink}>View Members</a>
      </li>
    </ul>
  );
}

/*
  Ability to select which members to import from google contact api
  <li
    className="membersSection--importMembers">
      <a href="/create-new-project">New Project</a>
  </li>
*/
