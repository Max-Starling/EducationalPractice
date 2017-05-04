/* global document, event, window, classie, newModel, newRenderer, modalModule */
function profile() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  // const modalContent = document.getElementsByClassName('modal-content-prof')[0];
  const form = document.getElementsByClassName('profile-form')[0];
  const changeURL = document.getElementsByClassName('profile-input')[0];
  changeURL.placeholder = 'URL to new picture';
  changeURL.className = 'profile-input form-style';
  changeURL.style.color = '#aaaaaa';
  const changeLogin = document.getElementsByClassName('profile-input')[1];
  changeLogin.placeholder = '@NewLogin';
  changeLogin.className = 'profile-input form-style';
  changeLogin.style.marginTop = '1vw';
  changeLogin.maxLength = '16';
  changeLogin.style.color = '#aaaaaa';
  const changePassword = document.getElementsByClassName('profile-input')[2];
  changePassword.placeholder = 'yournewpassword';
  changePassword.className = 'profile-input form-style';
  changePassword.style.marginTop = '1vw';
  changePassword.type = 'password';
  changePassword.maxLength = '16';
  changePassword.style.color = '#aaaaaa';
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  [].slice.call(document.querySelectorAll('.modal-trigger5')).forEach((el) => {
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'modal-show4');
    }
    el.addEventListener('click', () => {
      classie.add(modal, 'modal-show4');
      overlay.removeEventListener('click', removeModalHandler);
      overlay.addEventListener('click', removeModalHandler);
    });
    const close = modal.querySelector('.md-close');
    close.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const url = changeURL.value;
      const uname = changeLogin.value.toString();
      // const password = changePassword.value.toString();
      let correctLogin = true;
      let correctPassword = true;
      if (changeLogin.value.length > 0) {
        correctLogin = true;
        changeLogin.style.color = '#aaaaaa';
      } else if (changeLogin.value.length < 1) {
        correctLogin = false;
        changeLogin.style.color = '#8b1500';
      }
      if (changePassword.value.length >= 4) {
        correctPassword = true;
        changePassword.style.color = '#aaaaaa';
      } else if (changePassword.value.length < 4) {
        // correctPassword = false;
        changePassword.style.color = '#8b1500';
      }
      const username = document.getElementsByClassName('user-info-name')[0];
      const userphoto = document.getElementsByClassName('user-info-photo')[0];
      // alert(correctLogin);
      // alert(correctPassword);
      if (correctLogin && correctPassword) {
        if (uname) {
          username.textContent = uname;
        }
        if (url) {
          userphoto.src = url;
        }
        changeURL.value = '';
        changeLogin.value = '';
        changePassword.value = '';
        ev.stopImmediatePropagation();
        removeModalHandler();
      }
    });
  });
}
