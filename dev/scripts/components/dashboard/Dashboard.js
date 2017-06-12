import React, { Component } from 'react';
import {getFirebase, getProject, getDocuments, getLastLogin} from '../../lib/firebase-util';
import {getGapi, getMail, getMessage} from '../../lib/gapi-util';
import {getProjectNames, createOrQuery, getNeedDocs} from '../../lib/util';
import {Menu, DefaultDashboard, NewProject, AllProjects} from './index';
import moment from 'moment'

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.userId = getFirebase().auth().currentUser.uid;
    this.fetchMail = this.fetchMail.bind(this);
    this.syncProjectDocs = this.syncProjectDocs.bind(this);
    this.createDocuments = this.createDocuments.bind(this);
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
  }

  fetchMail(since) {
    // console.log('fetch called');
    let date = new Date(since);
    let sinceFormatted = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
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
        // console.log('query', query);

        if (since === undefined) {
          // console.log('query', query);
          getMail(query).then((response) => {
            // console.log('emails', response);
            this.syncProjectDocs(response.result.messages);
          });
        }
        else {
          // Append date to query
          query += `after:${sinceFormatted}`;
          // console.log('query', query);
          getMail(query).then((response) => {
            // console.log('emails since', response);
            this.syncProjectDocs(response.result.messages);
          });
        }
      }); // get document then
    }); // Get project then
  }

  syncProjectDocs(emails) {
    // Handle when no email is returned
    // No new documents
    if (emails.length === 0) {
      console.log('No new email to check');
    }
    else {
      console.log('received emails', emails);
      // Make an ajax request for each email
      getMessage(emails[0].id)
      .then((res) => {
        console.log('res', res);
      });
        // Parse the information into {projectName, attachmentsName}

      // Iterate over each projects
        // get all the needDoc array
        // Compare the ajax request info with needDoc
        // Create a new array of actual receivedDocuments
        // Update receivedDocuments by using the array from above
    }
  }
  render() {
    return (
      <div className="dashboard">
        <Menu />
        <AllProjects />
      </div>
    );
  }
}

{/* <NewProject /> */}
{/* <DefaultDashboard /> */}
