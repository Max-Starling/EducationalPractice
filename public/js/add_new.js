/* global document, event, window, classie, newModel, newRenderer, modalModule */
function addNew() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  const modalContent = document.querySelector('.modal-content-add');
  const form = modalContent.querySelector('.add-new-form');

  const inputURL = form.querySelectorAll('.add-new-input')[0];
  inputURL.placeholder = 'Image URL';
  inputURL.type = 'text';
  inputURL.value = '';

  const inputTitle = form.querySelectorAll('.add-new-input')[1];
  inputTitle.style.marginTop = '0.5vw';
  inputTitle.placeholder = 'Title';
  inputTitle.type = 'text';
  inputTitle.maxLength = '24';
  inputTitle.value = '';

  const inputShortDescription = form.querySelectorAll('.add-new-textarea')[0];
  inputShortDescription.style.marginTop = '0.5vw';
  inputShortDescription.maxLength = '80';
  inputShortDescription.value = '';

  const inputContent = form.querySelectorAll('.add-new-textarea')[1];
  inputContent.style.height = '9.6vw';
  inputContent.style.marginTop = '0.5vw';
  inputContent.maxLength = '1280';
  inputContent.value = '';

  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };

  const el = document.querySelector('.modal-trigger1');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'modal-show1');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'modal-show1');
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
      author: currentUser.user,
      content: '',
      img: '',
    };
    // const ID = newModel.getLength() + 1;
    // let correctID = '';
    // if (ID >= 10) {
    //    correctID = `00${ID}`;
    //  } else if (ID >= 100) {
    //     correctID = `0${ID}`;
    //   } else if (ID >= 1000) {
    //    correctID = ID;
    //  } else {
    //     correcID = `000${ID}`;
    //   }
    n.img = inputURL.value.toString();
    n.title = inputTitle.value.toString();
    n.summary = inputShortDescription.value.toString();
    n.content = inputContent.value.toString();
    newModel.addNew(n);
    newRenderer.removeNewsFromDom();
    const news = newModel.getNews(0, newModel.getLength());
    newRenderer.insertNewsInDOM(news);
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
      inputShortDescription.style.color = '#8b1500';
    } else {
      inputShortDescription.style.color = '#aaaaaa';
    }
    if (n.title && n.summary && n.content) {
      inputURL.value = '';
      inputContent.value = '';
      inputShortDescription.value = '';
      inputTitle.value = '';
      inputTitle.style.color = '#aaaaaa';
      inputContent.style.color = '#aaaaaa';
      inputShortDescription.style.color = '#aaaaaa';
      removeModalHandler();
    }
  });
}
