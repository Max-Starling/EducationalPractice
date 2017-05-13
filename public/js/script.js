/* global document, event, window, classie, newsModal, newsService, usersService, usersModal */
const currentUser = {
  username: 'Unknown',
  password: '',
  rank: 'Guest',
  img: 'images/users/guest_photo.jpg',
};
const newModel = (function () {
  function validateNew(n) {
    console.log(n);
    /* ID*/
    if (
      !n.title ||
      n.title.length === 0 ||
      !n.summary ||
      n.summary.length === 0 ||
      !n.createdAt ||
      !n.author ||
      !n.content ||
      n.content.length === 0
    ) {
      return false;
    }
    return true;
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
    return newsService.getNews().map(x => x.author);
  }
  function getNews(skip, top, criterion, value) {
    //  Default //
    if (!skip) {
      skip = 0;
    }
    if (!top) {
      top = 8;
    }
    let out;
    newsService
      .getNews()
      .then((news) => {
        news.forEach((n) => {
          n.createdAt = new Date(n.createdAt);
        });
        out = news;
        console.log(news);
        sortNews(out);
        if (criterion && value) {
          //  Title  //
          if (criterion === 'title') {
            out = out.filter(n => value === n.title);
          }
          //  Author  //
          if (criterion === 'author') {
            out = out.filter(n => value === n.author);
          }
          //  Date  //
          if (criterion === 'date') {
            // date = new Date(value);
            out = out.filter(
              n =>
                n.createdAt
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toString().toLowerCase()) >= 0,
            );
          }
        }
        console.log(skip, top);
        return out.slice(skip, skip + top);
      })
      .catch((reason) => {
        console.log(`Handle rejected promise, because: ${reason}.`);
        return false;
      });
    return true;
  }
  function addNew(n) {
    if (validateNew(n)) {
      newsService.addNew(n);
    }
  }
  function removeNew(ID) {
    newsService.removeNew(ID);
  }
  function editNew(ID, n) {
    newsService.editNew(ID, n);
  }
  return {
    getNews,
    editNew,
    removeNew,
    validateNew,
    sortNews,
    searchNews,
    addNew,
    getAuthors,
    // getLength,
  };
}());

const newRenderer = (function () {
  let newTemplate;
  let ARTICLE_LIST_NODE;
  function init() {
    newTemplate = document.querySelector('#template-new-list-item');
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
    const t = newTemplate;
    t.content.querySelector('.new-list-item').dataset.ID = n._id; //
    t.content.querySelector('.new-list-item-title').textContent = n.title;
    t.content.querySelector('.new-list-item-summary').textContent = n.summary;
    t.content.querySelector('.new-list-item-author').textContent = n.author;
    t.content.querySelector('.new-list-item-content').textContent = n.content;
    t.content.querySelector('.new-list-item-img').src = n.img;
    t.content.querySelector('.new-list-item-date').textContent = formatDate(
      n.createdAt,
    );
    return t.content.querySelector('.new-list-item').cloneNode(true);
  }

  function renderNews(news) {
    console.log(news);
    return news.map(n => renderNew(n));
  }
  function insertNewInDOM(n) {
    // ARTICLE_LIST_NODE.appendChild(n);
    ARTICLE_LIST_NODE.insertBefore(n, ARTICLE_LIST_NODE.firstChild);
  }
  function insertNewsInDOM(news) {
    /* if (!news) {
      news = newsService.getNews();
    } */
    const newsNodes = renderNews(news);
    // console.log(news);
    newsNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
    });
  }
  function removeNewsFromDom() {
    ARTICLE_LIST_NODE.innerHTML = '';
  }
  function removeNewFromDom(node) {
    ARTICLE_LIST_NODE.removeChild(node);
  }

  return {
    init,
    formatDate,
    insertNewsInDOM,
    insertNewInDOM,
    renderNew,
    removeNewsFromDom,
    removeNewFromDom,
  };
}());
function renderNews(skip, limit) {
  newsService.getNews(skip, limit).then((news) => {
    news.forEach((n) => {
      n.createdAt = new Date(n.createdAt);
    });
    // newModel.sortNews(news);
    newRenderer.insertNewsInDOM(news);
  });
}
function startApp() {
  console.log('start app');
  newRenderer.init();
  usersService.getCurrentUser().then((user) => {
    console.log(user);
    if (user) {
      usersModal.switchMode(user);
    }
  });
  newsService
    .getSize()
    .then((length) => {
      console.log(length);
      let limit;
      if (
        document.documentElement.clientWidth /
          document.documentElement.clientHeight >=
        4 / 3
      ) {
        limit = 8;
      } else {
        limit = 20;
      }
      renderNews(0, limit);
      let tmp = 0;
      let d = 0;

      function onScroll() {
        if (document.querySelector('.large-container').scrollTop > tmp) {
          console.log(tmp);
          tmp += 200;
          if (limit + d < length) {
            renderNews(limit + d, 4);
            console.log(limit + d, limit + d + 4);
            d += 4;
          }
        }
      }
      document.querySelector('.large-container').onscroll = function () {
        onScroll();
      };
    })
    .catch(reason =>
      console.log(`Handle rejected promise, because: ${reason}.`),
    );
}
document.addEventListener('DOMContentLoaded', startApp);
