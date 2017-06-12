import React, {Component} from 'react';
import {LoginForm, LoginToggle, SignupForm} from './index';
import {getFirebase} from '../../lib/firebase-util';
import {CLIENT_ID, DISCOVERY_DOCS, SCOPES} from '../../lib/keys';
import {isValidEmail, getDefaultState, isValidPassword} from '../../lib/util';
import { ajax } from 'jquery';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: {
        'email': '',
        'password': ''
      },
      newUser: {
        'email': '',
        'password': '',
        'rePassword': ''
      },
      formType: 'login',
      statusMessage: ''
    }
    this.defaultState = getDefaultState(this.state);

    this.formTypeChange = this.formTypeChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFirebaseErr = this.handleFirebaseErr.bind(this);
    this.initalizeUser = this.initalizeUser.bind(this);
  }

  handleFirebaseErr(errMessage) {
    this.setState({statusMessage: errMessage});
  }
  handleOnChange(e) {
    if (this.state.formType === 'login') {
      let loginUser = Object.assign({}, this.state.loginUser, {[e.target.name]: e.target.value});
      this.setState({loginUser});
    }
    else {
      let newUser = Object.assign({}, this.state.newUser, {[e.target.name]: e.target.value});
      this.setState({newUser});
    }
  }
  initalizeUser() {
    const user = getFirebase().auth().currentUser;
    const database = getFirebase().database();
    const userId = user.uid;
    const usersRef = database.ref('/users/'+userId);
    const userName = emailAddressToUsername(user.email)
    usersRef.set({
      userId: userId,
      username: userName
    });
  }
  loginUser(e) {
    if (isValidEmail(this.state.loginUser.email)) {
      getFirebase().auth().signInWithEmailAndPassword(this.state.loginUser.email, this.state.loginUser.password)
      .then((user) => {
        console.log('successful login');
        this.setState({
          loginUser: Object.assign({}, this.defaultState.loginUser),
          statusMessage: ''
        });
      },
      (err) => this.handleFirebaseErr(err.message));
    }
    else {
      this.setState({statusMessage: "Invalid email address"});
    }
  }
  createUser(e) {
    if (isValidEmail(this.state.newUser.email) && isValidPassword(this.state.newUser)) {
      getFirebase().auth().createUserWithEmailAndPassword(this.state.newUser.email, this.state.newUser.password)
      .then((user) => {
        console.log('successful signup');
        this.initalizeUser();
        this.setState({
          newUser: Object.assign({},this.defaultState.newUser),
          statusMessage: '',
          formType: 'login'
        });
      },
      (err) => this.handleFirebaseErr(err.message));
    }
    else if (!isValidPassword(this.state.newUser)) {
      if (!isValidEmail(this.state.newUser.email)) {
        this.setState({statusMessage: "Invalid email address && non-matching password"});
      }
      this.setState({statusMessage: "Non-matching password entry"});
    }
    else {
      this.setState({statusMessage: "Invalid email address"});
    }
  }
  formTypeChange(formType) {
    if (formType === 'login') {
      return (
        <div >
          <LoginForm
            className="login--login-form"
            email={this.state.loginUser.email}
            password={this.state.loginUser.password}
            handleOnChange={this.handleOnChange}
          />
          <LoginToggle
            className="login--form-toggle"
            loginUser={this.loginUser}
            toggleFormType={this.toggleFormType}
          />
        </div>
      );
    }
    else {
      return (
        <SignupForm
          email={this.state.newUser.email}
          password={this.state.newUser.password}
          rePassword={this.state.newUser.rePassword}
          handleOnChange={this.handleOnChange}
          toggleFormType={this.toggleFormType}
          createUser={this.createUser}
        />
      )
    }
  }
  toggleFormType() {
    if (this.state.formType === 'login') {
      this.setState({formType: 'signupForm'});
    }
    else {
      this.setState({
        formType: 'login',
        newUser: Object.assign({},this.defaultState.newUser)
      });
    }
  }
  render() {
    return (
      <div className="login">
        <h3 className="login--statusMessage">{this.state.statusMessage}</h3>
        {this.formTypeChange(this.state.formType)}
      </div>
    );
  }
}
