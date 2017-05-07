/* global document, event, window, classie, newModel, newRenderer, modalModule, currentUser */
function editNew(
  parentModal,
  parentModalShow,
  ID,
  title,
  description,
  content,
  image) {
  const overlay = document.querySelector('.second-overlay-layer');
  // const modalContent = document.getElementsByClassName('md-content-edit')[0];
  const form = document.getElementsByClassName('edit-new-form')[0];
  const inputURL = form.getElementsByClassName('edit-new-input')[0];
  // const modalTitle = document.getElementsByClassName('md-title')[0]
  //  .textContent;
  inputURL.placeholder = 'Image URL';
  inputURL.type = 'text';
  inputURL.value = image;
  //  Title  //
  const inputTitle = document.getElementsByClassName('edit-new-input')[1];
  inputTitle.style.marginTop = '0.5vw';
  inputTitle.placeholder = 'Title';
  inputTitle.type = 'text';
  inputTitle.value = title;
  inputTitle.maxLength = '24';
  //  Short description  //
  const inputShortDescription = document.getElementsByClassName(
    'edit-new-textarea',
  )[0];
  inputShortDescription.style.marginTop = '0.5vw';
  inputShortDescription.maxLength = '80';
  inputShortDescription.value = description;
  //  Content  //
  const inputContent = document.getElementsByClassName('edit-new-textarea')[1];
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
    n.summary = inputShortDescription.value.toString();
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
