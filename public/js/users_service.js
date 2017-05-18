/* global XMLHttpRequest */
const usersService = (function () {
  const xhr = new XMLHttpRequest();

  //  Check user  //
  function checkUser(username) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/checkUser?username=${username}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject());
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

  //  Check rights  //
  function checkRights(required) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/checkRights?required=${required}`);
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject());
      xhr.onerror = () => reject(new Error('Error'));
    });
  }

  //  Get rights  //
  function getRights(required) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', '/getRights');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject());
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

  //  Check password  //
  function checkPassword(inputPassword) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/checkPassword?inputPassword=${inputPassword}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(inputPassword));
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject());
      xhr.onerror = () => reject(new Error('Error'));
    });
  }

  //  Change username  //
  function changeUsername(oldName, newName) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/changeProfile?oldName=${oldName}&newName=${newName}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
    });
  }

  //  Change image //
  function changeImage(username, newImage) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/changeProfile?username=${username}&newImage=${newImage}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200 ? resolve(xhr.responseText) : reject());
      xhr.onerror = () => reject(new Error('Error'));
    });
  }

  //  Post mention  //
  function addMention(mention) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/postMention');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(mention));
      xhr.onload = () =>
       (xhr.status === 200
        ? resolve()
        : reject('can not post mention.'));
      xhr.onerror = () => reject(new Error('Error'));
    });
  }

  //  Log in  //
  function logIn(user) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/login');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(user));
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('username or password is incorrect.'));
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }

  //  Log out  //
  function logOut() {
    return new Promise((resolve, reject) => {
      xhr.open('GET', '/logOut');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve()
          : reject('can not log out'));
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }
  return {
    registerUser,
    logIn,
    logOut,
    addMention,
    getCurrentUser,
    changeUsername,
    changeImage,
    checkUser,
    checkPassword,
    checkRights,
    getRights,
  };
}());
