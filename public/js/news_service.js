/* global XMLHttpRequest */
const newsService = (function () {
  const xhr = new XMLHttpRequest();

  //  Get news  //
  function getNews(skip, limit) { /* filter*/
    return new Promise((resolve, reject) => {
      xhr.open('GET', `/news?skip=${skip}&limit=${limit}`/* &filter=${JSON.stringify(filter)}*/);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send();
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not get news'));
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
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not count news size.'));
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
      xhr.send(JSON.stringify(n));
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not add new'));
      xhr.onerror = function () {
        reject(new Error('Error'));
      };
    });
  }

  //  Edit new  //
  function editNew(ID, n) {
    return new Promise((resolve, reject) => {
      xhr.open('PUT', `/news/${ID}`);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not edit new'));
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
      xhr.onload = () =>
        (xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject('can not remove new'));
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
