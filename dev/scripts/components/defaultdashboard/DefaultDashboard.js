import React, { Component } from 'react';

export class DefaultDashboard extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="defaultdashboard">
        <h2 className="defaultdashboard__header">Welcome {this.props.username}</h2>
        <div className="defaultdashboard__messages-section">
          <p className="defaultdashboard__lastLogin">Since the last time your were here: <span>{this.props.lastLogin}</span></p>
          <p className="defaultdashboard__message">{this.props.message}</p>
        </div>
      </div>
    );
  }
}
