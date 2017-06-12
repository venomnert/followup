export const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const isValidPassword = (newUser) => {
  if (newUser.password.localeCompare(newUser.rePassword) === 0){ return true; }
  else { return false; }
}

export const getDefaultState = (state) => {
  return Object.assign({}, state);
}

const _pipe = (a,b) => (...args) => b(a(...args));

export const pipe = (...func) => func.reduce(_pipe);

export const partial = (fnc, ...args) => fnc.bind(null, ...args);

export const checkDuplicate = (arr, el) => {
  if (arr.indexOf(el) < 0) {
    return false;
  }
  else {
    return true;
  }
}

export const immutableAddArray = (arr, el) => [...arr,el];

export const immutableRemoveArray = (arr, el) => {
  const itemIndex = arr.indexOf(el);
  // console.log(arr, el, itemIndex);
  return [
    ...arr.slice(0, itemIndex),
    ...arr.slice(itemIndex+1)
  ]
}

export const isEmptyObj = (obj) => {
  if(Object.keys(obj).length === 0) {return true;}
  else { return false; }
}

export const getLast = (arr) => arr[arr.length-1];

export const convertToFilename= (docName) => docName.toLowerCase().split(' ').join('_');

export const validateForm = (toCheck, withCheck, skip) => {
  let result = false;
  let message = '';
  for (let k in toCheck) {
    if (skip.indexOf(k) >= 0) {
      continue;
    }
    else if (toCheck[k] !== withCheck[k]) {
      result = true;
    }
    else {
      result = false;
      message = `Invalid ${k} value`;
      break;
    }
  }
  return { result, message}
}

export const emailAddressToUsername = (emailAddress) => emailAddress.toLowerCase().substring(0, emailAddress.indexOf('@'));

export const spreadArray = (arr) => arr.map(el => el);

export const stripUniqueKeys = (obj) => {
  const objArr = [];
  for (let key in obj) {
    objArr.push(obj[key])
  }
  return [...objArr];
}

export const calcPercent = (docObj) => {
  let total = docObj.requiredDocuments.length;
  let received = '';
  if (docObj.receivedDocuments === undefined) { received = 0; }
  else { received = docObj.receivedDocuments.length; }
  return Math.round(received/total);
};

export const getProjectNames = (projects) => {
  // Strip keys
  // return projectNames
  const getName = (arr)=> {
    console.log('return ', arr);
    return arr.map((project) => {
      return project.projectName
    });
  }
  const projectNames = pipe(stripUniqueKeys, getName);
  return projectNames(projects);
}

export const mergeProjectName = (name) => { return name.split(' ').join('_'); }

export const createOrQuery = (selector, value) => {
  if (typeof value === 'string') {
    return `{${selector}:${mergeProjectName(value)}}`;
  }
  else {
    let q = '{';
    for (let i = 0; i < value.length-1; i++) {
      q+=`${selector}:${mergeProjectName(value[i])} `
    }
    q+= `${selector}:${mergeProjectName(getLast(value))} } `;
    return q;
  }
}

export const getRemainingDocs = (req, received) => {
  return req.map((doc) => {
    if (received.indexOf(doc) < 0) {
      return doc.id;
    }
   });
}
export const getRemainingDocsNames = (needDocArr, docs) => {
  return needDocArr.map((needDocId) => {
    return docs[needDocId].name;
  });
}

export const getNeedDocs = (projects, docs) => {
  const remainDocs = [];

  stripUniqueKeys(projects).forEach((project) => {
    if (project.documents.receivedDocuments !== undefined) {
      const remainingDocs = getRemainingDocs(project.documents.requiredDocuments, project.documents.receivedDocuments);
      console.log('remain', remainingDocs);
      remainingDocs.forEach((docId) => {
        remainDocs.push(docs[docId].name);
      });
    }
    else {
      project.documents.requiredDocuments.forEach((docId) => {
        // console.log(docs[docId].name);
        remainDocs.push(docs[docId].name);
      });
    }
  });

  return remainDocs;
}
