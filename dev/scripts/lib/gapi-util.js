import {CLIENT_ID, DISCOVERY_DOCS, SCOPES} from './keys';
import {pipe} from './util'

const initClient = (callback) => {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    })
    .then(() => {
      const setGmailAuth = pipe(saveGmailAccess, callback);
      gapi.auth2.getAuthInstance().isSignedIn.listen((result) => { setGmailAuth(result); });
      Promise.resolve(gapi.auth2.getAuthInstance().signIn())
      .then((res) => {
        console.log('success',res);
        setGmailAuth(true);
      })
      .catch((err) => {
        console.log('failed', err);
        setGmailAuth(false);
      });
      // if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        // callback(getGapi());
      // }
    });
}


export const getGapi = () => gapi;

export const initializeGmail = (callback) => {
  gapi.load('client:auth2', () => {initClient(callback)} );
}

export const gmailSignOut = () => gapi.auth2.getAuthInstance().signOut();

export const getMail = (query) => {
  // Mails are searched in the inbox only
  // Get emails after a certain time peroid
  // Make sure that emails have attachments
  // Make sure that the emails have a heading that match any of the current in progress projects

  return (
      gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': 100,
      'q': `${query}`
    })
  );
}

export const getMessage = (messageId) => {
  return (
    gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': messageId
    })
  );
}

const saveGmailAccess = (result) => {
  // console.log('listener called', result);
  window.sessionStorage.setItem('saveGmailAccess', result);
  return result;
}
