import React, {Component} from 'react';
import {getFirebase} from '../../lib/firebase-util';
import {emailAddressToUsername} from '../../lib/util';
import {Link } from 'react-router-dom';

export class UserSection extends Component {
  constructor(props) {
    super(props);

      this.state = {
        userName: ''
      }

    this.authSubscriber = "";
  }
  componentDidMount() {
      this.authSubscriber = getFirebase().auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          this.setState({userName: emailAddressToUsername(user.email)});
        }
      });
  }
  componentWillUnmount() {
    this.authSubscriber();
  }
  render() {
    return (
      <Link
        to="/"
        onClick={this.props.navToggle}
        >
        <div className="userSection">
        <img
          className="userSection--avatar"
          src="https://avatars.io/instagram/username"
          alt="User avatar" />
          <h3 className="userSection--username">{this.state.userName}</h3>
        </div>
      </Link>
    );
  }
}
