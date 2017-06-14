import React from 'react';
import {Link } from 'react-router-dom';


export const ProjectsSection = (props) => {
  return (
    <ul className="projectsSection">
      <li className="projectsSection--projects"><Link to="/dashboard/allProjects">View Projects</Link></li>
      <li className="projectsSection--newProject"><Link to="/dashboard/newProject">New Project</Link></li>
    </ul>
  );
}
