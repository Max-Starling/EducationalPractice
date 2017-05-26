/* global document, event, window, classie, newModel,
newRenderer, newsService, currentUser, renderNews, usersService */
(function (window) {
  /**
   * VALIDATE POSTING NEW
   */
  function validatePostingNew(n) {
    // const regexp = '/[A-Za-zА-Яа-я0-9]/';
    if (n.title) {
      if (n.title.length > 24) {
        return false;
      }
    } else {
      return false;
    }
    if (n.img) {
      if (n.img.length > 100) {
        return false;
      }
    }
    if (n.summary) {
      if (n.summary.length > 80) {
        return false;
      }
    } else {
      return false;
    }
    if (n.content) {
      if (n.content.length > 1280) {
        return false;
      }
    } else {
      return false;
    }
    if (!n.createdAt) {
      return false;
    }
    if (!n.author) {
      return false;
    }
    return true;
  }
  /**
   * VALIDATE EDITING NEW
   */
  function validateEditingNew(n) {
    // const reg = '/[A-Za-zА-Яа-я0-9]/';
    console.log(n);
    if (n.title) {
      if (n.title.length > 24) {
        return false;
      }
    }
    if (n.img) {
      if (n.img.length > 300) {
        return false;
      }
    }
    if (n.summary) {
      if (n.summary.length > 80) {
        return false;
      }
    }
    if (n.content) {
      if (n.content.length > 1280) {
        return false;
      }
    }
    if (!n.createdAt) {
      return false;
    }
    if (!n.author) {
      return false;
    }
    return true;
  }
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
        rights: '0',
      };
      if (inputURL.value) {
        n.img = inputURL.value.toString();
      } else {
        n.img = 'images/news/default_img.jpg';
      }
      n.title = inputTitle.value.toString();
      n.summary = inputDescription.value.toString();
      n.content = inputContent.value.toString();
      usersService.getRights()
      .then((r) => {
        console.log(r);
        n.rights = r;
        if (validatePostingNew(n)) {
          newsService.addNew(n).then((post) => {
            console.log('post', post);
            if (!post.img) {
              post.img = 'images/news/default_img.jpg';
            }
            post.createdAt = new Date(post.createdAt);
            newRenderer.insertNewInDOM(newRenderer.renderNew(post));
          });
        }
      });
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
      // if (validateEditingNew(n)) {
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
      // }
    };
    const el = document.querySelector('.md-trigger9');
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'md-show8');
    }
    function removeParentModalHandler() {
      classie.remove(parentModal, parentModalShow);
    }
    // el.addEventListener('click', () => {
    //  classie.add(modal, 'md-show8');
    //  overlay.removeEventListener('click', removeModalHandler);
    //  overlay.addEventListener('click', removeModalHandler);
    // });
    classie.add(modal, 'md-show8');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);

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

    // el.addEventListener('click', () => {
    //  classie.add(modal, 'md-show6');
    //  overlay.removeEventListener('click', removeModalHandler);
    //  overlay.addEventListener('click', removeModalHandler);
    // });
    classie.add(modal, 'md-show6');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);

    const buttonYes = modal.querySelector('.button-yes');
    const buttonSure = modal.querySelector('.button-sure');
    const buttonNo = modal.querySelector('.button-no');

    if (parentModal && parentModalShow && newID) {
      buttonYes.style.display = 'inline-block';
      buttonNo.style.display = 'inline-block';
      buttonSure.style.display = 'none';
      buttonYes.onclick = function (event) {
        newsService.getNew(newID)
          .then(() => {
            newsService.removeNew(newID);
            newRenderer.removeNewFromDom(n);
            newsService.getSize()
              .then((length) => {
                if (length > 7) {
                  newRenderer.getNews(7, 7);
                }
              });
          });
        removeModalHandler();
        classie.remove(parentModal, parentModalShow);
        event.stopImmediatePropagation();
      };
      buttonNo.onclick = function (event) {
        event.stopPropagation();
        removeModalHandler();
      };
    } else if (parentModal) {
      buttonYes.style.display = 'inline-block';
      buttonNo.style.display = 'inline-block';
      buttonSure.style.display = 'none';
      buttonYes.onclick = function (event) {
        parentModal();
        event.stopImmediatePropagation();
        removeModalHandler();
      };
      buttonNo.onclick = function (event) {
        event.stopPropagation();
        removeModalHandler();
      };
    } else if (!parentModal) {
      buttonSure.style.display = 'inline-block';
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
    const target = event.currentTarget;

    const ID = target.dataset.ID;
    const rights = target.dataset.rights;

    const author = modalContent.querySelector('.new-list-item-author');
    author.textContent = target.querySelector('.author').textContent;

    const content = modalContent.querySelector('.md-list-item-content');
    content.textContent = target.querySelector('.content').textContent;

    const date = modalContent.querySelector('.new-list-item-date');
    date.textContent = target.querySelector('.date').textContent;

    const title = modalContent.querySelector('.md-list-item-title');
    title.textContent = target.querySelector('.title').textContent;

    const img = modalContent.querySelector('.md-list-item-img');
    const i = target.querySelector('.new-list-item-img').src;
    if (i === 'http://localhost:7777/' || i === 'http://localhost:7777/images/news/default_img.jpg') {
      img.style.display = 'none';
    } else {
      img.style.display = 'inline-block';
      img.src = i;
    }

    const modal = document.querySelector(`#${target.getAttribute('data-modal')}`);
    console.log('target', target.dataset);

    const edit = modal.querySelector('.md-trigger9');
    const del = modal.querySelector('.md-trigger7');
    usersService.getCurrentUser()
      .then((u) => {
        if (u) {
          usersService.checkRights(rights)
            .then((state) => {
              console.log(state);
              console.log(u.username, author.textContent);
              if (state || (u.username === author.textContent)) {
                edit.addEventListener('click', () => editNew(modal, 'md-show', ID, target));
                del.addEventListener('click', () => notice('Are you sure want to delete this?', modal, 'md-show', ID, target));
              } else {
                del.addEventListener('click', () => notice('Sorry, You do not have enough rights.'));
                edit.addEventListener('click', () => notice('Sorry, You do not have enough rights.'));
              }
            });
        }
      });
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
