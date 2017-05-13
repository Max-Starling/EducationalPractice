/* global XMLHttpRequest */
const newsService = (function () {
  const xhr = new XMLHttpRequest();
  //  Get news  //
  function getNews(skip, limit) { /* filterConfig*/
    return new Promise((resolve, reject) => {
      // xhr.open('GET', '/news');
      xhr.open('GET', `/news?skip=${skip}&limit=${limit}`/* &filterConfig=${JSON.stringify(filterConfig)}*/);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status !== 200) {
          reject('can not get news.');
        }
      };
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }
  //  Get new  //
  function getNew(ID) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/news/${ID}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not find new by this ID.'));
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }
  //  Get ID  //
  function getID(n) {
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/getID/${n}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not find new by this params.'));
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }
    //  Get size  //
  function getSize() {
    return new Promise((resolve, reject) => {
      xhr.open('GET', '/newsSize');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      /* xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can count news size.'));*/
      xhr.onload = () => {
        console.log(xhr.responseText);
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status !== 200) {
          reject('can count news size.');
        }
      };
      xhr.onerror = () => {
        reject(new Error('Error'));
      };
    });
  }
  //  Add new  //
  function addNew(n) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', '/postNew');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        }
      };
      xhr.onerror = function () {
        reject(new Error('Error'));
      };
      xhr.send(JSON.stringify(n));
    });
  }

  //  Edit new  //
  function editNew(ID, n) {
    return new Promise((resolve, reject) => {
      xhr.open('PUT', `/news/${ID}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.onerror = function () {
        reject(new Error('Error'));
      };
      xhr.send(JSON.parse(xhr.responseText));
    });
  }
  //  Remove new  //
  function removeNew(ID) {
    return new Promise((resolve, reject) => {
      xhr.open('DELETE', `/news/${ID}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve();
        }
      };
      xhr.onerror = function () {
        reject(new Error('Error'));
      };
      xhr.send();
    });
  }
  return {
    addNew,
    editNew,
    getNews,
    getNew,
    getID,
    getSize,
    removeNew,
  };
}());
