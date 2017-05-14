/* global document, event, window, classie, newModel,
newRenderer, newsService, currentUser, renderNews */
(function (window) {
  /**
   * ADD NEW
   */
  function addNew() {
    const overlay = document.querySelector('.fisrt-overlay-layer');
    const modalContent = document.querySelector('.md-content-add');
    //  Form  //
    const form = modalContent.querySelector('.add-new-form');
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
    };
    //  Image  //
    const inputURL = form.querySelectorAll('.add-new-input')[0];
    inputURL.placeholder = 'Image URL';
    inputURL.type = 'text';
    inputURL.value = '';
    //  Title  //
    const inputTitle = form.querySelectorAll('.add-new-input')[1];
    inputTitle.style.marginTop = '0.5vw';
    inputTitle.placeholder = 'Title';
    inputTitle.type = 'text';
    inputTitle.maxLength = '24';
    inputTitle.value = '';
    //  Short description  //
    const inputDescription = form.querySelectorAll('.add-new-textarea')[0];
    inputDescription.style.marginTop = '0.5vw';
    inputDescription.maxLength = '80';
    inputDescription.value = '';
    //  Content  //
    const inputContent = form.querySelectorAll('.add-new-textarea')[1];
    inputContent.style.height = '9.6vw';
    inputContent.style.marginTop = '0.5vw';
    inputContent.maxLength = '1280';
    inputContent.value = '';

    const el = document.querySelector('.md-trigger1');
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'md-show1');
    }
    el.addEventListener('click', () => {
      classie.add(modal, 'md-show1');
      overlay.removeEventListener('click', removeModalHandler);
      overlay.addEventListener('click', removeModalHandler);
    });
    const close = modal.querySelector('.md-close');
    close.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const n = {
        title: '',
        summary: '',
        createdAt: new Date(),
        author: currentUser.username,
        content: '',
        img: 'images/news/default_img.jpg',
      };
      if (n.img) {
        n.img = inputURL.value.toString();
      } else {
        n.img = 'images/news/default_img.jpg';
      }
      n.title = inputTitle.value.toString();
      n.summary = inputDescription.value.toString();
      n.content = inputContent.value.toString();
      if (newModel.validateNew(n)) {
        newsService.addNew(n).then((post) => {
          console.log('post', post);
          if (!post.img) {
            post.img = 'images/news/default_img.jpg';
          }
          post.createdAt = new Date(post.createdAt);
          newRenderer.insertNewInDOM(newRenderer.renderNew(post));
        });
      }
      event.stopImmediatePropagation();
      if (!n.title) {
        inputTitle.style.color = '#8b1500';
      } else {
        inputTitle.style.color = '#aaaaaa';
      }
      if (!n.content) {
        inputContent.style.color = '#8b1500';
      } else {
        inputContent.style.color = '#aaaaaa';
      }
      if (!n.summary) {
        inputDescription.style.color = '#8b1500';
      } else {
        inputDescription.style.color = '#aaaaaa';
      }
      if (n.title && n.summary && n.content) {
        inputURL.value = '';
        inputContent.value = '';
        inputDescription.value = '';
        inputTitle.value = '';
        inputTitle.style.color = '#aaaaaa';
        inputContent.style.color = '#aaaaaa';
        inputDescription.style.color = '#aaaaaa';
        removeModalHandler();
      }
    });
  }

  /**
   * EDIT NEW
   */
  const editNew = function (
    parentModal,
    parentModalShow,
    ID,
    target,
  ) {
    const overlay = document.querySelector('.second-overlay-layer');
    const form = document.querySelector('.edit-new-form');
    //  Image  //
    const inputURL = form.querySelectorAll('.edit-new-input')[0];
    inputURL.placeholder = 'Image URL';
    inputURL.type = 'text';
    inputURL.value = target.querySelector('.new-list-item-img').src;
    //  Title  //
    const inputTitle = document.querySelectorAll('.edit-new-input')[1];
    inputTitle.style.marginTop = '0.5vw';
    inputTitle.placeholder = 'Title';
    inputTitle.type = 'text';
    inputTitle.value = target.querySelector('.title').textContent;
    inputTitle.maxLength = '24';
    //  Short description  //
    const inputDescription = document.querySelectorAll('.edit-new-textarea')[0];
    inputDescription.style.marginTop = '0.5vw';
    inputDescription.maxLength = '80';
    inputDescription.value = target.querySelector('.description').textContent;
    //  Content  //
    const inputContent = document.querySelectorAll('.edit-new-textarea')[1];
    inputContent.style.height = '9.6vw';
    inputContent.style.marginTop = '0.5vw';
    inputContent.maxLength = '1280';
    inputContent.value = target.querySelector('.content').textContent;
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
      const n = {
        title: '',
        summary: '',
        content: '',
        img: target.querySelector('.new-list-item-img').src,
      };
      n.img = inputURL.value.toString();
      n.title = inputTitle.value.toString();
      n.summary = inputDescription.value.toString();
      n.content = inputContent.value.toString();
      newsService.editNew(ID, n)
        .then(() => {
          target.querySelector('.new-list-item-img').src = n.img;
          target.querySelector('.title').textContent = n.title;
          target.querySelector('.description').textContent = n.summary;
          target.querySelector('.content').textContent = n.content;
        })
        .catch((reason) => {
          console.log(`Handle rejected promise, because: ${reason}.`);
        });
    };
    const el = document.querySelector('.md-trigger9');
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'md-show8');
    }
    function removeParentModalHandler() {
      classie.remove(parentModal, parentModalShow);
    }
    el.addEventListener('click', () => {
      classie.add(modal, 'md-show8');
      overlay.removeEventListener('click', removeModalHandler);
      overlay.addEventListener('click', removeModalHandler);
    });
    const close = modal.querySelector('.md-close');
    close.addEventListener('click', (ev) => {
      ev.stopPropagation();
      removeParentModalHandler();
      removeModalHandler();
    });
  };

  /**
   * NOTICE
   */
  const notice = function (message, parentModal, parentModalShow, newID, n) {
    const overlay = document.querySelector('.second-overlay-layer');
    const modalContent = document.querySelector('.md-content-not');
    modalContent.querySelector('.message').textContent = message;
    //  Form  //
    const form = document.querySelector('.notice-form');
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
    };

    const el = document.querySelector('.md-trigger7');
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'md-show6');
    }

    el.addEventListener('click', () => {
      classie.add(modal, 'md-show6');
      overlay.removeEventListener('click', removeModalHandler);
      overlay.addEventListener('click', removeModalHandler);
    });

    const buttonYes = modal.querySelector('.button-yes');
    const buttonSure = modal.querySelector('.button-sure');
    const buttonNo = modal.querySelector('.button-no');

    if (parentModal && parentModalShow && newID) {
      buttonSure.style.display = 'none';
      buttonYes.onclick = function (event) {
        console.log(newID);
        newsService.getNew(newID)
          .then(() => {
            newsService.removeNew(newID);
            newRenderer.removeNewFromDom(n);
            newsService.getSize()
              .then((length) => {
                if (length > 7) {
                  renderNews(7, 7);
                }
              })
              .catch(reason =>
                console.log(`Handle rejected promise, because: ${reason}.`));
          })
          .catch((reason) => {
            console.log(`Handle rejected promise, because: ${reason}.`);
          });
        removeModalHandler();
        classie.remove(parentModal, parentModalShow);
        event.stopImmediatePropagation();
      };
      buttonNo.onclick = function (event) {
        event.stopPropagation();
        removeModalHandler();
      };
    } else {
      console.log('qqqq');
      buttonYes.style.display = 'none';
      buttonNo.style.display = 'none';
      buttonSure.onclick = function (event) {
        removeModalHandler();
        event.stopImmediatePropagation();
      };
    }
  };
  /**
   * DETAIL SHOW
   */
  const newDetailShow = function () {
    const overlay = document.querySelector('.fisrt-overlay-layer');

    const modalContent = document.querySelector('.md-content');
    const modalText = modalContent.querySelector('.md-text');
    const target = event.currentTarget;

    const ID = event.currentTarget.dataset.ID;
    console.log(event.currentTarget.dataset);
    console.log(ID);
    const author = modalText.querySelector('.new-list-item-author');
    const a = target.querySelector('.author');
    author.textContent = a.textContent;

    const content = modalText.querySelector('.md-list-item-content');
    const c = target.querySelector('.content');
    content.textContent = c.textContent;

    const date = modalText.querySelector('.new-list-item-date');
    const d = target.querySelector('.date');
    date.textContent = d.textContent;

    const title = modalText.querySelector('.md-list-item-title');
    const t = target.querySelector('.title');
    title.textContent = t.textContent;

    const sd = target.querySelector('.description');

    const img = modalContent.querySelector('.md-list-item-img');
    const i = target.querySelector('.new-list-item-img').src;
    console.log(i);
    if (i === 'http://localhost:7777/') {
      console.log("q");
      img.style.display = 'none';
    } else {
      img.style.display = 'inline-block';
      img.src = i;
    }
    const modal = document.querySelector(
      `#${target.getAttribute('data-modal')}`,
    );
    console.log('target', target);
    const edit = modal.querySelector('.md-trigger9');
    edit.addEventListener('click', editNew(modal, 'md-show', ID, target));

    const close = modal.querySelector('.md-trigger7');
    close.addEventListener('click',
      notice('Are you sure want to delete this?', modal, 'md-show', ID, target),
    );
    function removeModalHandler() {
      classie.remove(modal, 'md-show');
    }
    target.addEventListener('click', (event) => {
      classie.add(modal, 'md-show');
      overlay.removeEventListener('click', removeModalHandler);
      overlay.addEventListener('click', removeModalHandler);
      event.stopImmediatePropagation();
    });
  };

  const newsModal = {
    newDetailShow,
    addNew,
    editNew,
    notice,
  };
  window.newsModal = newsModal;
}(window));
