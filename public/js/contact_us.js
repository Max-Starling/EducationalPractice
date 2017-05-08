/* global document, event, window, classie, newModel, newRenderer, modalFunctions, newsService, currentUser */
function contactUs() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  const form = document.getElementsByClassName('contact-form')[0];

  const inputMention = form.getElementsByClassName('contact-textarea')[0];
  // inputContent.style.height = "9.6vw";
  // inputContent.style.marginTop = "0.5vw";
  inputMention.maxLength = '200';
  inputMention.placeholder =
    'You can leave here your opinion, critique or give us a fresh idea. Don\'t forget to name yourself ༼ つ ◕_◕ ༽つ';
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
    if (inputMention) {
      const m = {
        user: currentUser.user,
        mention: inputMention.value.toString(),
      };
      //console.log(m);
      newsService.addMention(m);
    }
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
