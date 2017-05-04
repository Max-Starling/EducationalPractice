
const serverService = (function () {
  const xhr = new XMLHttpRequest();
  //  Get news  //
  function getNews() {
    xhr.open('GET', '/news', false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();
    const news = JSON.parse(xhr.responseText);
    news.forEach((n) => {
      n.createdAt = new Date(n.createdAt);
    });
    return news;
  }
  //  Get new  //
  function getNew(ID) {
    xhr.open('GET', `/news/${ID}`, false);
    xhr.send();
    const n = JSON.parse(xhr.responseText);
    n.createdAt = new Date(n.createdAt);
    return n;
  }
  //  Add new  //
  function addNew(n) {
    xhr.open('POST', '/postNew', false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onerror = function () {
      reject(new Error('Error'));
    };
    xhr.send(JSON.stringify(n));
  }
  //  Edit new  //
  function editNew(ID, n) {
    xhr.open('PUT', `/news/${ID}`, false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onerror = function () {
      reject(new Error('Error'));
    };
    xhr.send(JSON.stringify(n));
  }
  //  Remove new  //
  function removeNew(ID) {
    xhr.open('DELETE', `/news/${ID}`, false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onerror = function () {
      reject(new Error('Error'));
    };
    xhr.send();
  }
  return {
    //  Full names  //
    addNew,
    editNew,
    getNews,
    getNew,
    removeNew,
    //  Short names  //
    addn: addNew,
    editn: editNew,
    getn: getNew,
    getns: getNews,
    removen: removeNew,
  };
}());
