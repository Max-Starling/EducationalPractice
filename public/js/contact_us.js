/* global document, event, window, classie, newModel, newRenderer, modalFunctions */
function contactUs() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  // const modalContent = document.querySelector('.md-content-cont')
  const form = document.getElementsByClassName('contact-form')[0];

  const inputContent = form.getElementsByClassName('contact-textarea')[0];
  // inputContent.style.height = "9.6vw";
  // inputContent.style.marginTop = "0.5vw";
  inputContent.maxLength = '200';
  inputContent.placeholder =
    'You can leave here your opinion, critique or give us a fresh idea. Don\'t forget to name yourself ༼ つ ◕_◕ ༽つ';
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  const el = document.querySelector('.md-trigger8');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'md-show7');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'md-show7');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (ev) => {
    ev.stopPropagation();
    removeModalHandler();
  });
}
