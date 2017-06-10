import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Login} from './components/login/Login';
import {getFirebase} from './lib/firebase-util';

class App extends Component {
  render() {
    return (
      <div>
        <Login  />
      </div>
    );
  }

}



ReactDOM.render(<App />, document.getElementById('app'));
