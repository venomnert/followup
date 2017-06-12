import {CLIENT_ID, DISCOVERY_DOCS, SCOPES} from './keys';

const initClient = (callback) => {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  })
  .then(() => {
    // gapi.auth2.getAuthInstance().isSignedIn.listen(signedIn);
    gapi.auth2.getAuthInstance().signIn();
    callback(getGapi());
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
      getGapi().client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': 10,
      'q': `label:inbox ${query}`
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
