/* global XMLHttpRequest */
const usersService = (function () {
  const xhr = new XMLHttpRequest();
  //  Get users  //
/*  function getUsers() {
    xhr.open('GET', '/users', false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();
    const users = JSON.parse(xhr.responseText);
    console.log(users);
    return users;
  }*/
  //  Check user  //
/*  function checkUser(username, password) {
    if (username && password) {
      xhr.open('GET', `/checkUser/${username}/${password}`, false);
      xhr.setRequestHeader('content-type', 'application/json');
      console.log(username, password);
      xhr.send(username, password);
    } else if (username) {
      xhr.open('GET', `/checkUser/${username}`, false);
      xhr.setRequestHeader('content-type', 'application/json');
      console.log(username);
      xhr.send(username);
    }
    return JSON.parse(xhr.responseText); 
  }*/
  //  Register new  user //
  function registerUser(username) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/register');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
      xhr.send(JSON.stringify(username));
    });
  }
  //  Edit profile  //
  function editProfile(username, user) {
    return new Promise((resolve, reject) => {
      xhr.open('PUT', `/users/${username}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
      xhr.send(JSON.stringify(user));
    });
  }
  //  Post mention  //
  function addMention(mention) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/postMention');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
      xhr.send(JSON.stringify(mention));
    });
  }
  function logIn(user) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/login');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('username or password is incorrect.'));
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
      xhr.send(JSON.stringify(user));
    });
  }
  function logOut() {
    return new Promise((resolve, reject) => {
      xhr.open('GET', '/logOut');
      xhr.onload = () => (xhr.status === 200 ? resolve() : reject());
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
      xhr.send();
    });
  }
  return {
    registerUser,
    logIn,
    logOut,
    editProfile,
    addMention,
    // checkUser,
    // getUsers,
  };
}());
