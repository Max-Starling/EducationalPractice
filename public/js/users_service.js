/* global XMLHttpRequest */
const usersService = (function () {
  const xhr = new XMLHttpRequest();
  //  Get users  //
  function getUsers() {
    xhr.open('GET', '/users', false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();
    const users = JSON.parse(xhr.responseText);
    console.log(users);
    return users;
  }
  //  Check user  //
  function checkUser(user, password) {
    xhr.open('GET', `/checkUser/${user}/${password}`, false);
    xhr.setRequestHeader('content-type', 'application/json');
    console.log('news_service.js:');
    console.log(user, password);
    xhr.send(user, password);
    const state = JSON.parse(xhr.responseText);
    console.log(state);
    return state;
  }

  //  Post mention  //
  function addMention(m) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/postMention');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve();
        }
      };
      xhr.onerror = function () {
        reject(new Error('Error'));
      };
      xhr.send(JSON.stringify(m));
    });
  }
  return {
    addMention,
    checkUser,
    getUsers,
  };
}());
