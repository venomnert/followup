import React, { Component } from 'react';
import {getFirebase} from '../../lib/firebase-util';

export class CircleMember extends Component {
  constructor(props) {
    super(props);

    this.fetchImg = this.fetchImg.bind(this);
  }
  fetchImg(memberId) {
    const user = getFirebase().auth().currentUser;
    const database = getFirebase().database();
    const userId = user.uid;
    const membersRef = database.ref('/members/' + userId + `/${memberId}`);
    membersRef.once('value').then((snapshot) => {
      console.log('Member for image', snapshot.val());
    });
  }
  render() {
    return (
      <div className="circleMember">
        <img
          className="circleMember-img"
          src="https://avatars.io/instagram/username" />
      </div>
    );
  }
}
