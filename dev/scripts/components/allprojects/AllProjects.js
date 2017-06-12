import React, { Component } from 'react';
import {MiniProjectCard} from './index';
import {getFirebase} from '../../lib/firebase-util';
import {stripUniqueKeys} from '../../lib/util';

export class AllProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    const user = getFirebase().auth().currentUser;
    const database = getFirebase().database();
    const userId = user.uid;
    const projectsRef = database.ref('/projects/' + userId);

    projectsRef.on('value', (snapshot) => {
      this.setState({projects: stripUniqueKeys(snapshot.val())});
    });
   }

 makeMiniProjectCards() {
  return this.state.projects.map((project) => {
    return <MiniProjectCard
              key={project.id}
              project={project} />
  });
 }


  render() {
    return (
      <ul className="allprojects-list">
        Testing
        {this.makeMiniProjectCards()}
      </ul>
    );
  }
}
