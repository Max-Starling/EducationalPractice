/* global XMLHttpRequest */
const usersService = (function () {
  const xhr = new XMLHttpRequest();
  //  Check user  //
  function checkUser(username, password) {
    if (username && password) {
      return new Promise((resolve, reject) => {
        xhr.open('GET', `/checkUser?username=${username}&password=${password}`);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send();
        xhr.onload = () =>
          (xhr.status === 200 ? resolve(xhr.responseText) : reject());
        xhr.onerror = () => reject(new Error('Error'));
      });
    } else if (username) {
      return new Promise((resolve, reject) => {
        xhr.open('GET', `/checkUser?username=${username}`);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send();
        xhr.onload = () =>
          (xhr.status === 200 ? resolve(xhr.responseText) : reject());
        xhr.onerror = () => reject(new Error('Error'));
      });
    }
    return new Promise((resolve, reject) => {
      xhr.onerror = () => reject(new Error('Error'));
    });
  }
  //  Register new  user //
  function registerUser(username) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/register');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(username));
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
    });
  }
  //  Get current user  //
  function getCurrentUser() {
    return new Promise((resolve, reject) => {
      xhr.open('GET', '/currentUser');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject());
      xhr.onerror = () => reject(new Error('Error'));
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
    getCurrentUser,
    checkUser,
  };
}());
