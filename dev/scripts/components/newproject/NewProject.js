import React, { Component } from 'react';
import {NewProjectForm} from './index';
import {getDefaultState, validateForm} from '../../lib/util';
import {getFirebase} from '../../lib/firebase-util';
import moment from 'moment';

export class NewProject extends Component {
  constructor(props) {
    super(props);

      this.state = {
        newProject: {
        projectName: '',
        dueDate: moment(),
        documents: {
          requiredDocuments: [],
          receivedDocuments: []
        },
        notes: '',
        members: [],
        email: ''
      },
      errMessage: ''
    }
    this.documentsList = [
      { name: 'pay_slip', id: '-KmSq67fIn0-Jic5IPAQ', category: 'income' },
      { name: 'income_Tax', id: '-KmSq67bQ1It-n1U_HHI', category: 'income' }
    ]
    this.membersList = [
      { id: '1', name: 'John Will' },
      { id: '2', name: 'Woo Hoo' }
    ]
    this.defaultState = getDefaultState(this.state);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnChange(e) {
    const newProject = Object.assign({}, this.state.newProject, {[e.target.name]: e.target.value});
    this.setState({newProject});
  }
  handleTimeChange(date) {
    const newProject = Object.assign({}, this.state.newProject, {dueDate: date});
    this.setState({newProject});
  }
  handleMultiSelect(name, list) {
    if (name === 'members') {
      const newProject = Object.assign({}, this.state.newProject, {[name]: list});
      this.setState({newProject});
    }
    else {
      const newDocuments = Object.assign({},this.state.newProject.documents, {['requiredDocuments']: list} )
      const newProject = Object.assign({}, this.state.newProject, {[name]: newDocuments});
      this.setState({newProject});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const userId = getFirebase().auth().currentUser.uid;
    const database = getFirebase().database();
    // console.log('user id', userId);

    const projectsRef = database.ref('/projects/'+userId);
    const newPostRef = projectsRef.push();
    const projectId = newPostRef.key;
    const time = this.state.newProject.dueDate._d.toString();
    const validFormResult = validateForm( Object.assign({}, this.state.newProject), this.defaultState.newProject, ['notes']);
    console.log(validFormResult);
    const errMessage = validFormResult.message;
    if (validFormResult.result) {
      newPostRef.set({
        id: projectId,
        projectName: this.state.newProject.projectName,
        dueDate: time,
        documents: this.state.newProject.documents,
        notes: this.state.newProject.notes,
        members: this.state.newProject.members,
        email: this.state.newProject.email
      });
      this.setState({
        newProject: this.defaultState.newProject,
        errMessage: ''
      });
    }
    else {
      this.setState({errMessage});
    }
  }

  render() {
    return (
      <div>
        <h1 className="newproject--header">Create A New Project</h1>
        <p className="newproject--descr">Create a new project to track your documents.</p>
        {this.state.errMessage.length === 0 ? '': <h2>{this.state.errMessage}</h2>}
        <NewProjectForm
          newProject={this.state.newProject}
          handleOnChange={this.handleOnChange}
          handleTimeChange={this.handleTimeChange}
          handleSubmit={this.handleSubmit}
          handleMultiSelect={this.handleMultiSelect}
          documents={this.documentsList}
          members={this.membersList}
        />
      </div>
    );
  }
}
