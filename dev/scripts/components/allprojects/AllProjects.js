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

   componentWillUnmount() {
     const user = getFirebase().auth().currentUser;
     const database = getFirebase().database();
     const userId = user.uid;
     const projectsRef = database.ref('/projects/' + userId);

     projectsRef.off();
   }

   makeMiniProjectCards() {
     if (this.state.projects.length === 0) {
       return (
         <div className="emptyProject">
           <h2 className="emptyProject__header">No Projects</h2>
         </div>
       );
     }
     else {
       return this.state.projects.map((project) => {
         return <MiniProjectCard
           key={project.id}
           project={project} />
         });
     }
   }
  render() {
    return (
      <ul className="allprojects-list">
        {this.makeMiniProjectCards()}
      </ul>
    );
  }
}
