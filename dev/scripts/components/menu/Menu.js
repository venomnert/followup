import React, { Component } from 'react';
import {getFirebase, firebaseSignout} from '../../lib/firebase-util';
import {gmailSignOut} from '../../lib/gapi-util';
import {spreadArray} from '../../lib/util';
import {UserSection, ProjectsSection, MembersSection, Logout} from './index';
import moment from 'moment';

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.lastLogin = this.lastLogin.bind(this);
  }
  lastLogin() {
    const user = getFirebase().auth().currentUser;
    const database = getFirebase().database();
    const userId = user.uid;
    let lastLoginRef = database.ref('/users/'+userId);
    lastLoginRef.once('value')
    .then((snapshot) => {
      const logoutTime = moment()._d.toString();
      // Check if lastLogin exist if not do the below
      if (snapshot.val().lastLogin === undefined) {
        lastLoginRef
        .update({lastLogin: logoutTime})
        .then(() => {
          gmailSignOut();
          firebaseSignout();
          window.location.replace("/");
        });
      }
      else if (typeof snapshot.val().lastLogin === 'string') {
        let newLoginData = [].concat(logoutTime, snapshot.val().lastLogin);
        lastLoginRef
        .update({lastLogin: newLoginData})
        .then(() => {
          gmailSignOut();
          firebaseSignout();
          window.location.replace("/");
        });
      }
      else { // If lastLogin exists
        let newLoginData = [].concat(logoutTime, spreadArray(snapshot.val().lastLogin));
        // console.log('new data', newLoginData);
        lastLoginRef
        .update({lastLogin: newLoginData})
        .then(() => {
          gmailSignOut();
          firebaseSignout();
          window.location.replace("/");
        });
      }
    });
  }
  handleLogout() {
    // Make sure to remove all listeners from the database
    this.lastLogin();
  }
  handleLink(e) {
    console.log('I was clicked', e);
    e.preventDefault();
  }
  render() {
    return (
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-item--userSection"><UserSection /></li>
          <li className="menu-item--projectsSection"><i className="fa fa-folder" aria-hidden="true"></i><h4>Projects</h4><ProjectsSection /></li>
          {/* <li className="menu-item--memebersSection"><MembersSection /></li> */}
          <li className="menu-item--logoutBtn"><Logout handleLogout={this.handleLogout} /></li>
        </ul>
      </nav>
    );
  }
}
