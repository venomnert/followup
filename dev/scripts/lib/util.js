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
