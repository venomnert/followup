import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Login} from './components/login/Login';
import {Dashboard} from './components/dashboard/Dashboard';
import {getFirebase} from './lib/firebase-util';
import {initializeGmail, getGapi} from './lib/gapi-util';
import {emailAddressToUsername} from './lib/util';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      gapi: false
    }
  }


  componentWillMount() {
     getFirebase().auth().onAuthStateChanged((user) => {
      //  console.log('Change in auth state', getFirebase().auth().currentUser);
      //  console.log(user);
       if (user) {
         initializeGmail(gapi => this.setState({gapi}));
         this.setState({signedIn: true});
       }
       else {
         this.setState({
           signedIn: false,
           gapi: false
         });
       }
     });
   }
  render() {
    if (this.state.signedIn && this.state.gapi) {
      return (
        <Dashboard
          user={'Neerthigan'}
        />
      );
    }
    else {
      return (
        <Login />
      );
    }
  }

}



ReactDOM.render(<App />, document.getElementById('app'));

// <DefaultDashboard />
