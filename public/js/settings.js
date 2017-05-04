/* global document, event, window, classie */
function settings() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  // const modalContent = document.querySelector('.modal-content-sett');
  //  Form  //
  const form = document.querySelector('.settings-form');
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };

  const slider = document.querySelector('.slider');
  const el = document.querySelector('.modal-trigger6');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'modal-show5');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'modal-show5');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (event) => {
    //  Saturation effect from 0.5 to 1.5 with slider  //
    const value = (slider.value / 100) + 0.5;
    const wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.style.filter = `saturate(${value})`;
    event.stopPropagation();
    removeModalHandler();
  });
}
