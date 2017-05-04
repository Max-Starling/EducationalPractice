function editNew(
  parentModal,
  parentModalShow,
  ID,
  title,
  description,
  content,
) {
  const overlay = document.querySelector('.second-overlay-layer');
  const modalContent = document.getElementsByClassName('modal-content-edit')[0];
  const form = document.getElementsByClassName('edit-new-form')[0];
  const inputURL = document.getElementsByClassName('edit-new-input')[0];
  const modalTitle = document.getElementsByClassName('modal-title')[0]
    .textContent;
  inputURL.placeholder = 'Image URL';
  inputURL.type = 'text';
  const inputTitle = document.getElementsByClassName('edit-new-input')[1];
  inputTitle.style.marginTop = '0.5vw';
  inputTitle.placeholder = 'Title';
  inputTitle.type = 'text';
  inputTitle.value = title;
  inputTitle.maxLength = '24';
  const inputShortDescription = document.getElementsByClassName(
    'edit-new-textarea',
  )[0];
  inputShortDescription.style.marginTop = '0.5vw';
  inputShortDescription.maxLength = '80';
  inputShortDescription.value = description;
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
      author: 'You',
      content: '',
      img: '',
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
  const el = document.querySelector('.modal-trigger9');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'modal-show8');
  }
  function removeParentModalHandler() {
    classie.remove(parentModal, parentModalShow);
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'modal-show8');
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
