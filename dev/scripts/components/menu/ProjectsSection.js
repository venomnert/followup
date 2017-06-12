import React from 'react';

export const ProjectsSection = (props) => {
  return (
    <ul className="projectsSection">
      <li className="projectsSection--projects"><a href="/projects" onClick={props.handleLink}>View Projects</a></li>
      <li className="projectsSection--newProject"><a href="/create-new-project" onClick={props.handleLink}>New Project</a></li>
    </ul>
  );
}
