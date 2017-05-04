/* global document, event, window, classie, newModel, newRenderer, modalModule */
const newDetailShow = function () {
  const overlay = document.querySelector('.fisrt-overlay-layer');

  const modalContent = document.querySelector('.modal-content');
  const modalText = modalContent.querySelector('.modal-text');
  // alert(modalText.textContent);
  const target = event.currentTarget;

  const ID = event.currentTarget.dataset.ID;
  console.log(ID);
  const author = modalText.querySelector('.author');
  const a = target.querySelector('.author').textContent;
  author.textContent = a;

  const content = modalText.querySelector('.content');
  const c = target.querySelector('.content').textContent;
  content.textContent = c;

  const date = modalText.querySelector('.date');
  const d = target.querySelector('.date').textContent;
  date.textContent = d;

  const title = modalText.querySelector('.title');
  const t = target.querySelector('.title').textContent;
  title.textContent = t;

  const sd = target.querySelector('.description').textContent;

  const modal = document.querySelector(`#${target.getAttribute('data-modal')}`);

  const edit = modal.querySelector('.modal-trigger9');
  edit.addEventListener('click', editNew(modal, 'modal-show', ID, t, sd, c));

  const close = modal.querySelector('.modal-trigger7');
  close.addEventListener(
    'click',
    modalModule.notice(
      'Are you sure want to delete this?',
      modal,
      'modal-show',
      ID,
    ),
  );
  function removeModalHandler() {
    classie.remove(modal, 'modal-show');
  }
  target.addEventListener('click', (event) => {
    classie.add(modal, 'modal-show');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
    event.stopImmediatePropagation();
  });
};
