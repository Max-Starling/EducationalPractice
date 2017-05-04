/* global document, event, window, classie, newModel, newRenderer, modalModule, serverService */
// const currentUser = {
//  user: 'Unknown',
//  password: '',
// rank: 'Guest',
// img: '',
// };

const newModel = (function () {
  function validateNew(n) {
    /* ID*/
    if (!n.ID) {
      // console.log('Oops. Something is wrong. You should try again later.(ID)')
      return false;
    }
    /* Title*/
    if (!n.title) {
      /* console.log(
        'Oops. Empty field. You should check field \'title\' and try again.',
      )*/
      return false;
    }
    if (n.title.length === 0) {
      /* console.log(
        'Oops. Length limit is broken. You should check field \'title\' and try again.',
      )*/
      return false;
    }

    /* Summary*/
    if (!n.summary) {
      return false;
    } else if (n.summary.length === 0) {
      /* console.log(
        'Oops. Length limit is broken. You should check field \'summary\' and try again.',
      )*/
      return false;
    }
    /* Date*/
    if (!n.createdAt) {
      /* console.log(
        'Oops. Something is wrong. You should try again later.(createdAt)',
      )*/
      return false;
    }
    /* Author*/
    if (!n.author) {
      /* console.log(
        'Oops. Something is wrong. You should try again later.(author)',
      )*/
      return false;
    } else if (n.author.length === 0) {
      /* console.log(
        'Oops. Something is wrong. You should check it and try again.(author.length)',
      )*/
      return false;
    }
    /* Content*/
    if (!n.content) {
      /* console.log(
        'Oops. Something is wrong with content. You should check it and try again.',
      )*/
      return false;
    } else if (n.content.length === 0) {
      /* console.log(
        'Oops. Something is wrong with content length. You should check it and try again.',
      )*/
      return false;
    }
    return true;
  }
  function getLength() {
    return serverService.getNews().length;
  }
  function getNew(ID) {
    return serverService.getNew(ID);
  }
  function sortNews(news, criterion) {
    news.sort((x, y) => {
      if (x.createdAt < y.createdAt) {
        return 1;
      } else if (x.createdAt > y.createdAt) {
        return -1;
      }
    });
    if (criterion === 'title') {
      news.sort((x, y) => {
        if (x.title > y.title) {
          return 1;
        } else if (x.title < y.title) {
          return -1;
        }
      });
    }
    if (criterion === 'author') {
      news.sort((x, y) => {
        if (x.author > y.author) {
          return 1;
        } else if (x.author < y.author) {
          return -1;
        }
      });
    }
    if (criterion === 'textsize') {
      news.sort((x, y) => {
        if (x.content.length < y.content.length) {
          return 1;
        } else if (x.content.length > y.content.length) {
          return -1;
        }
      });
    }
  }
  function searchNews(inputValue, news, criterion) {
    let occurrenceArray = [];
    function unique(arr) {
      const obj = {};
      for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
      return Object.keys(obj);
    }

    if (criterion === 'title') {
      // console.log(`${criterion} ${inputValue}`)
      let occurrenceArray = [];
      news.map(x => x.title).some((element) => {
        if (
          element
            .toString()
            .toLowerCase()
            .indexOf(inputValue.toString().toLowerCase()) >= 0
        ) {
          // console.log(element)
          occurrenceArray.push(element);
        }
      });
      occurrenceArray = unique(occurrenceArray);
      return occurrenceArray;
    }
    if (criterion === 'author') {
      news.map(x => x.author).some((element) => {
        if (
          element
            .toString()
            .toLowerCase()
            .indexOf(inputValue.toString().toLowerCase()) >= 0
        ) {
          occurrenceArray.push(element);
        }
      });
      occurrenceArray = unique(occurrenceArray);
      return occurrenceArray;
    }
    if (criterion === 'date' || !criterion) {
      // console.log("qqq");
      /* news.map(x => x.createdAt).some(
                function(element){
                    console.log(element.toString().toLowerCase());
  if(element.toString().toLowerCase().indexOf(inputValue.toString().toLowerCase()) >= 0){
                        occurrenceArray.push(element);
                    }
                }
            );*/
      // occurrenceArray = unique(occurrenceArray);
      occurrenceArray.push(inputValue);
      return occurrenceArray;
    }
  }
  function getAuthors() {
    return serverService.getNews().map(x => x.author);
  }
  function getNews(skip, top, criterion, value) {
    /* Default*/
    let out = serverService.getNews();
    if (!skip) {
      skip = 0;
    }
    if (!top) {
      top = out.length;
    }
    sortNews(out);
    if (criterion && value) {
      // console.log(criterion);
      //  Title  //
      if (criterion === 'title') {
        out = out.filter(
          n =>
            // console.log(value, n.title)
            value === n.title,
        );
      }
      //  Author  //
      if (criterion === 'author') {
        // console.log(criterion);
        out = out.filter(
          n =>
            // console.log(value, n.author)
            value === n.author,
        );
      }
      //  Date  //
      if (criterion === 'date') {
        // date = new Date(value);
        out = out.filter(
          n =>
            // console.log(value.toString().toLowerCase())
            //  console.log(n.createdAt.toString().toLowerCase())
            // console.log('     ')
            //  console.log(
            // n.createdAt
            //   .toString()
            //   .toLowerCase()
            //   .indexOf(value.toString().toLowerCase()),
            // )
            // if(value){
            n.createdAt
              .toString()
              .toLowerCase()
              .indexOf(value.toString().toLowerCase()) >= 0,
          // }
        );
      }
      // sortNews(out, criterion);
    }
    console.log(out);
    return out.slice(skip, skip + top);
  }
  function addNew(n) {
    // const news = serverService.getNews()
    if (validateNew(n)) {
      // news.push(n);
      serverService.addNew(n);
      return true;
    }
    return false;
  }
  function removeNew(ID) {
    // const news = serverService.getNews();
    serverService.removeNew(ID);
    // var tmp = 0;
    // console.log(`ID ${ID}`)
    /* for (var i = 0; i < news.length; i++) {
            if (news[i].ID === ID) {
                tmp = i;
            }
        }
        news.splice(tmp, 1);*/

    // alert(news.length);
  }
  function editNew(ID, n) {
    // let news = serverService.getNews();
    serverService.editNew(ID, n);
    /* for (var i = 0; i < news.length; i++) {
            if (news[i].ID === ID) {
                tmp = i;
            }
        }
        var i = tmp;
        if (news[i]) {
            var tmp = news[i];
            if (n.title) {
                news[i].title = n.title;
            }
            if (n.summary) {
                news[i].summary = n.summary;
            }
            if (n.createdAt) {
                news[i].createdAt = n.createdAt;
            }
            if (n.author) {
                news[i].author = n.author;
            }
            if (n.content) {
                news[i].content = n.content;
            }
            if (n.img) {
                news[i].img = n.img;
            }
            if (!validateNew(news[i])) {
                news[i] = tmp;
                return false;
            } else {
                return true;
            }
        }
        return false;*/
  }
  return {
    getNew,
    getNews,
    editNew,
    removeNew,
    sortNews,
    searchNews,
    addNew,
    getAuthors,
    getLength,
  };
}());
/* var userInfo = (function () {
    var username = document.getElementsByClassName("user-info-name")[0].textContent;
    function getUserName() {
        //username
        console.log(username + "");
        alert(username + "");
    }
    function setUserName(usrnm) {
        username = usrnm;
    }
    return {
        getUserName: getUserName,
        setUserName: setUserName,
        //short
        getn: getUserName,
        setn: setUserName
    };
}());
*/
const newRenderer = (function () {
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST_NODE;
  function init() {
    ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
    ARTICLE_LIST_NODE = document.querySelector('.article-list');
  }
  function addZero(i) {
    if (i < 10) {
      i = `0${i}`;
    }
    return i;
  }
  function formatDate(d) {
    let month = 'Jan';
    switch (d.getMonth()) {
      case 0:
        month = 'Jan';
        break;
      case 1:
        month = 'Feb';
        break;
      case 2:
        month = 'Mar';
        break;
      case 3:
        month = 'Apr';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'Jun';
        break;
      case 6:
        month = 'Jul';
        break;
      case 7:
        month = 'Aug';
        break;
      case 8:
        month = 'Sep';
        break;
      case 9:
        month = 'Oct';
        break;
      case 10:
        month = 'Nov';
        break;
      case 11:
        month = 'Dec';
        break;
      default:
        month = 'Feb';
        break;
    }
    return `${d.getHours()}:${addZero(d.getMinutes())} ${month}, ${d.getDate()}`;
  }
  function renderNew(n) {
    const template = ARTICLE_TEMPLATE;
    template.content.querySelector('.article-list-item').dataset.ID = n.ID;
    template.content.querySelector('.article-list-item-title').textContent =
      n.title;
    template.content.querySelector('.article-list-item-summary').textContent =
      n.summary;
    template.content.querySelector('.article-list-item-author').textContent =
      n.author;
    template.content.querySelector('.article-list-item-content').textContent =
      n.content;
    template.content.querySelector('.article-list-item-img').src = n.img;
    template.content.querySelector(
      '.article-list-item-date',
    ).textContent = formatDate(n.createdAt);
    return template.content.querySelector('.article-list-item').cloneNode(true);
  }

  function renderNews(news) {
    return news.map(n => renderNew(n));
  }
  function insertNewsInDOM(news) {
    if (!news) {
      news = serverService.getNews();
    }
    const newsNodes = renderNews(news);
    newsNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
    });
  }
  function removeNewsFromDom() {
    ARTICLE_LIST_NODE.innerHTML = '';
  }
  /* function removeNewFromDom(node) {
    ARTICLE_LIST_NODE.removeChild(node);
  }*/

  return {
    init,
    formatDate,
    insertNewsInDOM,
    removeNewsFromDom,
  };
}());
function renderNews(skip, top) {
  newRenderer.removeNewsFromDom();
  const news = newModel.getNews(skip, top, { author: '' });
  newRenderer.insertNewsInDOM(news);
}
function startApp() {
  newRenderer.init();
  renderNews(0, 20);
}
document.addEventListener('DOMContentLoaded', startApp);
