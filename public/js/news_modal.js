/* global document, event, window, classie, newModel, newRenderer, newsService, currentUser */
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
        ID: `${newModel.getLength() + 1}`,
        title: '',
        summary: '',
        createdAt: new Date(),
        author: currentUser.username,
        content: '',
        img: '',
      };
      n.img = inputURL.value.toString();
      n.title = inputTitle.value.toString();
      n.summary = inputDescription.value.toString();
      n.content = inputContent.value.toString();
      newModel.addNew(n);
      newRenderer.insertNewInDOM(newRenderer.renderNew(n));
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
    title,
    description,
    content,
    image,
  ) {
    const overlay = document.querySelector('.second-overlay-layer');
    const form = document.querySelector('.edit-new-form');
    //  Image  //
    const inputURL = form.querySelectorAll('.edit-new-input')[0];
    inputURL.placeholder = 'Image URL';
    inputURL.type = 'text';
    inputURL.value = image;
    //  Title  //
    const inputTitle = document.querySelectorAll('.edit-new-input')[1];
    inputTitle.style.marginTop = '0.5vw';
    inputTitle.placeholder = 'Title';
    inputTitle.type = 'text';
    inputTitle.value = title;
    inputTitle.maxLength = '24';
    //  Short description  //
    const inputDescription = document.querySelectorAll('.edit-new-textarea')[0];
    inputDescription.style.marginTop = '0.5vw';
    inputDescription.maxLength = '80';
    inputDescription.value = description;
    //  Content  //
    const inputContent = document.querySelectorAll('.edit-new-textarea')[1];
    inputContent.style.height = '9.6vw';
    inputContent.style.marginTop = '0.5vw';
    inputContent.maxLength = '1280';
    inputContent.value = content;
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
      const n = {
        title: '',
        summary: '',
        // author: '',
        content: '',
        img: image,
      };
      n.img = inputURL.value.toString();
      n.title = inputTitle.value.toString();
      n.summary = inputDescription.value.toString();
      n.content = inputContent.value.toString();
      newModel.editNew(ID, n);
      newRenderer.removeNewsFromDom();
      const news = newModel.getNews(0, newModel.getLength());
      newRenderer.insertNewsInDOM(news);
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
        newRenderer.removeNewFromDom(newRenderer.renderNew(n));
        newsService.removeNew(newID);
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
    // alert(modalText.textContent);
    const target = event.currentTarget;

    const ID = event.currentTarget.dataset.ID;
    console.log(event.currentTarget.dataset);
    const author = modalText.querySelector('.article-list-item-author');
    const a = target.querySelector('.author').textContent;
    author.textContent = a;

    const content = modalText.querySelector('.md-list-item-content');
    const c = target.querySelector('.content').textContent;
    content.textContent = c;

    const date = modalText.querySelector('.article-list-item-date');
    const d = target.querySelector('.date').textContent;
    date.textContent = d;

    const title = modalText.querySelector('.md-list-item-title');
    const t = target.querySelector('.title').textContent;
    title.textContent = t;

    const sd = target.querySelector('.description').textContent;

    // const img = modalContent.querySelector('.picture');
    const img = modalContent.querySelector('.md-list-item-img');
    const i = target.querySelector('.article-list-item-img').src;
    console.log(i);
    img.src = i;
    title.textContent = t;

    const modal = document.querySelector(
      `#${target.getAttribute('data-modal')}`,
    );

    const edit = modal.querySelector('.md-trigger9');
    edit.addEventListener(
      'click',
      editNew(modal, 'md-show', ID, t, sd, c, i),
    );

    const close = modal.querySelector('.md-trigger7');
    close.addEventListener(
      'click',
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
