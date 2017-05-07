/* global document, event, window, classie, newModel, newRenderer, modalModule, editNew */
const newDetailShow = function () {
  const overlay = document.querySelector('.fisrt-overlay-layer');

  const modalContent = document.querySelector('.md-content');
  const modalText = modalContent.querySelector('.md-text');
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

  // const img = modalContent.querySelector('.picture');
  const i = target.querySelector('.article-list-item-img');
  // img = i.textContent;
  console.log(i.src);
  title.textContent = t;

  const modal = document.querySelector(`#${target.getAttribute('data-modal')}`);

  const edit = modal.querySelector('.md-trigger9');
  edit.addEventListener(
    'click',
    editNew(modal, 'md-show', ID, t, sd, c, i.src),
  );

  const close = modal.querySelector('.md-trigger7');
  close.addEventListener(
    'click',
    modalModule.notice(
      'Are you sure want to delete this?',
      modal,
      'md-show',
      ID,
    ),
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
