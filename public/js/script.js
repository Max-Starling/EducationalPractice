/* global document, event, window, classie, newsModal, newsService, usersService, usersModal */
const currentUser = {
  username: 'Unknown',
  password: '',
  rank: 'Guest',
  img: 'images/users/guest_photo.jpg',
};

const newRenderer = (function () {
  let newTemplate;
  let newsList;
  function init() {
    newTemplate = document.querySelector('#template-new-list-item');
    newsList = document.querySelector('.article-list');
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
      case 0: month = 'Jan'; break;
      case 1: month = 'Feb'; break;
      case 2: month = 'Mar'; break;
      case 3: month = 'Apr'; break;
      case 4: month = 'May'; break;
      case 5: month = 'Jun'; break;
      case 6: month = 'Jul'; break;
      case 7: month = 'Aug'; break;
      case 8: month = 'Sep'; break;
      case 9: month = 'Oct'; break;
      case 10: month = 'Nov'; break;
      case 11: month = 'Dec'; break;
      default: month = 'Feb'; break;
    }
    return `${d.getHours()}:${addZero(d.getMinutes())} ${month}, ${d.getDate()}`;
  }
  function renderNew(n) {
    const t = newTemplate;
    t.content.querySelector('.new-list-item').dataset.ID = n._id;
    t.content.querySelector('.new-list-item-title').textContent = n.title;
    t.content.querySelector('.new-list-item-summary').textContent = n.summary;
    t.content.querySelector('.new-list-item-author').textContent = n.author;
    t.content.querySelector('.new-list-item-content').textContent = n.content;
    t.content.querySelector('.new-list-item-img').src = n.img;
    t.content.querySelector('.new-list-item-date').textContent = formatDate(
      n.createdAt,
    );
    t.content.querySelector('.new-list-item').dataset.rights = n.rights;
    return t.content.querySelector('.new-list-item').cloneNode(true);
  }

  function renderNews(news) {
    console.log(news);
    return news.map(n => renderNew(n));
  }
  function insertNewInDOM(n) {
    newsList.insertBefore(n, newsList.firstChild);
  }
  function insertNewsInDOM(news) {
    const newsNodes = renderNews(news);
    newsNodes.forEach((node) => {
      newsList.appendChild(node);
    });
  }
  function removeNewsFromDom() {
    newsList.innerHTML = '';
  }
  function removeNewFromDom(node) {
    newsList.removeChild(node);
  }
  function getNews(skip, limit, criterion, filter) {
    newsService.getNews(skip, limit, criterion, filter)
      .then((news) => {
        news.forEach((n) => {
          n.createdAt = new Date(n.createdAt);
        });
        newRenderer.insertNewsInDOM(news);
      });
  }

  function sortNews(skip, limit, criterion) {
    newsService.sortNews(skip, limit, criterion)
      .then((news) => {
        news.forEach((n) => {
          n.createdAt = new Date(n.createdAt);
        });
        newRenderer.insertNewsInDOM(news);
      });
  }

  function loadNews(action, criterion, filter) {
    newsService.getSize()
    .then((length) => {
      console.log(length);
      newRenderer.removeNewsFromDom();
      let limit;
      if (document.documentElement.clientWidth /
          document.documentElement.clientHeight >= 4 / 3) {
        limit = 8;
      } else {
        limit = 20;
      }
      if (action === 'sort' && criterion) {
        sortNews(0, limit, criterion);
      } else if (action === 'search' && criterion && filter) {
        console.log(criterion, filter);
        getNews(0, limit, criterion, filter);
      } else {
        getNews(0, limit);
      }
      let scrollValue = 0;
      let renderValue = 0;

      function onScroll() {
        if (document.querySelector('.large-container').scrollTop > scrollValue) {
          console.log(scrollValue);
          scrollValue += 200;
          if (limit + renderValue < length) {
            if (action === 'sort' && criterion) {
              sortNews(limit + renderValue, 4, criterion);
            } else if (action === 'search' && criterion) {
              getNews(limit + renderValue, 4, criterion, filter);
            } else {
              getNews(limit + renderValue, 4);
            }
            console.log(limit + renderValue, limit + renderValue + 4);
            renderValue += 4;
          }
        }
      }
      document.querySelector('.large-container').onscroll = onScroll;
    })
    .catch(reason =>
      console.log(`Handle rejected promise, because: ${reason}.`));
  }
  return {
    init,
    formatDate,
    insertNewsInDOM,
    insertNewInDOM,
    renderNew,
    removeNewsFromDom,
    removeNewFromDom,
    getNews,
    sortNews,
    loadNews,
  };
}());

function load() {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.wrapper').style.display = 'block';
  const modals = document.querySelectorAll('.md-default');
  [].forEach.call(modals, (m) => {
    m.style.display = 'block';
  });
  document.querySelector('.fisrt-overlay-layer').style.display = 'block';
  document.querySelector('.second-overlay-layer').style.display = 'block';
}

function startApp() {
  console.log('start app');
  newRenderer.init();
  usersService.getCurrentUser()
    .then((user) => {
      console.log(user);
      if (user) {
        usersModal.switchMode(user);
      }
    });
  newRenderer.loadNews();
}
document.addEventListener('DOMContentLoaded', startApp);

window.onload = () => {
  setTimeout(load, 1000 + (Math.random() * 1000));
};
