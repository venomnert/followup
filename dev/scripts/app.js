import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Login} from './components/login/Login';
import {Dashboard} from './components/dashboard/Dashboard';
import {getFirebase, firebaseSignout} from './lib/firebase-util';
import {initializeGmail, getGapi} from './lib/gapi-util';
import {emailAddressToUsername} from './lib/util';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    }
    this.getStyle = this.getStyle.bind(this);
  }
  getStyle() {
    if (this.state.signedIn) {
      return { margin: '100px'};
    }
    else { return {}; }
  }
  componentWillMount() {
    // Kep this code if you want to call gmail sign only once, but the problem with this is
    // the previous auth gets removed so you need to re authorize
    // if (!window.sessionStorage.getItem('saveGmailAccess')) {
    //   window.sessionStorage.setItem('saveGmailAccess', false);
    // }
    window.sessionStorage.setItem('saveGmailAccess', false);
     getFirebase().auth().onAuthStateChanged((user) => {
      //  console.log('Change in auth state', getFirebase().auth().currentUser);
      //  console.log(user);
       if (user) {
         if (sessionStorage.getItem('saveGmailAccess') === 'false') {
           initializeGmail((result) => {
             console.log('gmail sign in callback');
             if (result) { this.forceUpdate();}
             else {
               firebaseSignout();
               this.setState({signedIn: false});
             }
           });
           //  initializeGmail(gapi => {this.setState({gapi})});
         }
         this.setState({signedIn: true});
       }
       else {
         this.setState({signedIn: false});
       }
     });
   }
   render() {
     if (this.state.signedIn && window.sessionStorage.getItem('saveGmailAccess') !== 'false') {
       return <Dashboard user={'Neerthigan'} />
     }
     else { return <Login /> }
   }
}

ReactDOM.render(<App />, document.getElementById('app'));

//
// render() {
//   return (
//     <Router>
//         <div>
//             <Route exact path="/" component={Login} />
//             <Route path="/dashboard" component={Dashboard} />
//         </div>
//     </Router>
//   );
// }
