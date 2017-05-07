/* global document, event, window, classie, newModel, newRenderer, modalModule, currentUser */
function editNew(
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
  //  Image
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
  const inputDescription = document.querySelectorAll('.edit-new-textarea')[2];
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
}
