import React, { Component } from 'react';
import {getFirebase, getProject, getDocuments, getLastLogin} from '../../lib/firebase-util';
import {getGapi, getMail, getMessage} from '../../lib/gapi-util';
import {
        getProjectNames, createOrQuery,
        getNeedDocs, getResObj,
        stripUniqueKeys, mergeProjectName,
        checkComplete, emailAddressToUsername } from '../../lib/util';
import {Menu, DefaultDashboard, NewProject, AllProjects} from './index';
import moment from 'moment';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeMessage: '',
      userName: '',
      lastLogin: ''
    }
    this.userId = '';
    this.authSubscriber = ''
    this.fetchMail = this.fetchMail.bind(this);
    this.getDocFromMessage = this.getDocFromMessage.bind(this);
    this.createDocuments = this.createDocuments.bind(this);
    this.syncProjectDocs = this.syncProjectDocs.bind(this);
    this.removeCompleteDocs = this.removeCompleteDocs.bind(this);
  }

  createDocuments(name) {
    const database = getFirebase().database();
    const newDocRef = database.ref('/documents').push();
    const docId = newDocRef.key;
    newDocRef.set({
      id: docId,
      name: name
    });
  }

  componentDidMount() {
    this.authSubscriber = getFirebase().auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('logged in');
        this.userId = user.uid;
        this.setState({userName: emailAddressToUsername(user.email)})
        const database = getFirebase().database();
        getLastLogin(this.userId)
        .then((snapshot) => {
          let logInfo = '';
          if (snapshot.val().lastLogin === undefined) {
            // get 10 messages
            this.fetchMail();
          }
          else if (typeof snapshot.val().lastLogin === 'string') {
            logInfo = snapshot.val().lastLogin;
            this.fetchMail(logInfo);
          }
          else {
            logInfo = snapshot.val().lastLogin[0];
            //get messages after the logInfo
            this.fetchMail(logInfo);
          }
        });
      } else {
        // No user is signed in.
        console.log('not logged in', user);
      }
    });
  }

  fetchMail(since) {
    // console.log('fetch called');
    let date = new Date(since);
    let sinceFormatted = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
    this.setState({lastLogin: sinceFormatted});
    // console.log('since', since);
    let query = '';
    //get projectNames
    getProject(this.userId)
    .then((snapshot) => {
      const project = snapshot.val()
      const projectNames = getProjectNames(project);
      // make query
      query = createOrQuery('subject', projectNames);
      // console.log('query', query);

      // Get docs names
      getDocuments()
      .then((snapshot) => {
        const needDocs = getNeedDocs(project, snapshot.val());
        // console.log('needDocs', needDocs);

        query += createOrQuery('filename', needDocs).trim();
        console.log('query', query);

        if (since === undefined) {
          console.log('query', query);
          getMail(query).then((response) => {
            // console.log('emails', response);
            this.getDocFromMessage(response.result.messages);
          });
        }
        else {
          // Append date to query
          query += `after:${sinceFormatted}`;
          // console.log('query', query);
          getMail(query).then((response) => {
            // console.log('emails since', response);
            this.getDocFromMessage(response.result.messages);
          });
        }
      }); // get document then
    }); // Get project then
  }

  getDocFromMessage(emails) {
    // Handle when no email is returned
    // No new documents
    if (emails === undefined) {
      console.log('No new email to check');
      this.setState({homeMessage: 'No new email to check'});
    }
    else {
      console.log('received emails', emails);
      let receivedObjs = [];
      // Make an ajax request for each email
      for (let i = 0; i < emails.length; i++) {
        receivedObjs.push(getMessage(emails[i].id));
      }
      Promise.all(receivedObjs)
      .then((resArr)=>{
        // Parse the information into {projectName, attachmentsName}
        const recObjArr = resArr.map((obj) => {
          return getResObj(obj.result.payload);
        });

        // console.log('file name', recObjArr);
        this.syncProjectDocs(recObjArr);
      });
    }
  }

  syncProjectDocs(recObjArr) {
    console.log('recObj', recObjArr);
    getProject(this.userId)
    .then((snapshot) => {
      const projects = stripUniqueKeys(snapshot.val());
      // Iterate over each projects
      projects.forEach((project) => {
        // Find all the recObjArr that has the current project
        const receivedDocs = _.filter(recObjArr,['projectName', mergeProjectName(project.projectName)]);
        getDocuments()
        .then((snapshot) => {
          const documents = snapshot.val();
          project.documents.requiredDocuments.forEach((docId) => {
            let docName = documents[docId].name;
            let receivedDocuments = _.filter(receivedDocs, ['documentName', docName]);

            // Check if the documents matches the requiredDocuments
            if (receivedDocuments === undefined || receivedDocuments.length === 0) {
              console.log('Nothing');
            }
            else {
              // If so get the receivedDocuments id and add it to the project.documents.receivedDocuments
              // console.log('receivedDocs', project.projectName, docName);
              let update = []
              if (project.documents.receivedDocuments === undefined) {
                update.push(docId);
              }
              else {
                update = [...project.documents.receivedDocuments, docId];
              }
              getFirebase().database()
              .ref(`/projects/${this.userId}/${project.id}/documents`)
              .child('receivedDocuments').set(update);
              this.removeCompleteDocs(project);
            }
          });
        });// end of document snapshot
      });
    }); // end of project snapshot
  }

  removeCompleteDocs(project) {
    getFirebase().database().ref(`/projects/${this.userId}/${project.id}`).once('value')
    .then((snapshot)=>{
      let upProject = snapshot.val();
      // console.log('updated project', upProject);
      // console.log(checkComplete(upProject.documents.requiredDocuments, upProject.documents.receivedDocuments));
      if (checkComplete(upProject.documents.requiredDocuments, upProject.documents.receivedDocuments)) {
        // The project is completed add it to the complete list
        const completeRef = getFirebase().database().ref(`/completed/${this.userId}`);
        completeRef.child(`${project.id}`).set(upProject);

        // Remove the project from the incomplete list
        getFirebase().database().ref(`/projects/${this.userId}/${upProject.id}`).remove();
      }
    });
  }

  componentWillUnmount() {
    this.authSubscriber();
    console.log('Unsubscribed firebase auth');
  }

  render() {
    return (
      <Router>
        <div className="dashboard">
          <Menu />
            <div className="dashboard__dash">
              <Route exact path="/" render={(props) =>
                <DefaultDashboard
                  {...props}
                  message={this.state.homeMessage}
                  lastLogin={this.state.lastLogin}
                  username={this.state.userName}/>
              } />
              <Route path="/dashboard/newProject" component={NewProject} />
              <Route path="/dashboard/allProjects" component={AllProjects} />
            </div>
        </div>
    </Router>
    );
  }
}
/*
<Route path="/dashboard" component={DefaultDashboard} />

*/
