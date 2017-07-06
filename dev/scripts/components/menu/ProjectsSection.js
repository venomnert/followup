import React from 'react';
import {Link } from 'react-router-dom';


export const ProjectsSection = (props) => {
  return (
    <ul name="projectsSection" className="projectsSection">
      <li className="projectsSection--projects">
        <Link
          to="/dashboard/allProjects"
          onClick={() => {
            props.handleSubMenuToggle('projectsSection');
            props.navToggle();
          }}>View Projects</Link>
        </li>
      <li className="projectsSection--newProject">
        <Link
          to="/dashboard/newProject"
          onClick={() => {
            props.handleSubMenuToggle('projectsSection')
            props.navToggle();
          }}>New Project</Link>
      </li>
    </ul>
  );
}
