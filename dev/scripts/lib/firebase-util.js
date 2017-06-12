const config = {
    apiKey: "AIzaSyBb7lV2fxmnVRhRaHbihtMzX6lczU1W2Tc",
    authDomain: "followup-169920.firebaseapp.com",
    databaseURL: "https://followup-169920.firebaseio.com",
    projectId: "followup-169920",
    storageBucket: "followup-169920.appspot.com",
    messagingSenderId: "711206744911"
}
firebase.initializeApp(config);

export const getFirebase = () => firebase;

export const firebaseSignout = () => {
  console.log('logging out');
  firebase.auth().signOut();
}

export const getProject = (userId) => firebase.database().ref('/projects/'+userId).once('value');
export const getDocuments = () => firebase.database().ref('/documents').once('value');
export const getLastLogin = (userId) => firebase.database().ref('/users/'+userId).once('value');
