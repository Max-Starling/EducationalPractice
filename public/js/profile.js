/* global document, event, window, classie, newModel, newRenderer, modalModule, currentUser */
function profile() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  //  Form  //
  const form = document.querySelector('.profile-form');
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  //  Image  //
  const changeURL = form.querySelectorAll('.profile-input')[0];
  changeURL.placeholder = 'URL to new picture';
  changeURL.className = 'profile-input form-style';
  changeURL.style.color = '#aaaaaa';
  //  Login  //
  const changeLogin = form.querySelectorAll('.profile-input')[1];
  changeLogin.placeholder = '@NewLogin';
  changeLogin.className = 'profile-input form-style';
  changeLogin.style.marginTop = '1vw';
  changeLogin.maxLength = '16';
  changeLogin.style.color = '#aaaaaa';
  //  Password  //
  const changePassword = form.querySelectorAll('.profile-input')[2];
  changePassword.placeholder = 'yournewpassword';
  changePassword.className = 'profile-input form-style';
  changePassword.style.marginTop = '1vw';
  changePassword.type = 'password';
  changePassword.maxLength = '16';
  changePassword.style.color = '#aaaaaa';

  const el = document.querySelector('.md-trigger5');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'md-show4');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'md-show4');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (ev) => {
    ev.stopPropagation();

    const upass = changePassword.value.toString();
    if (upass === currentUser.password) {
      const uname = changeLogin.value.toString();
      const username = document.querySelector('.user-info-name');
      if (uname) {
        username.textContent = uname;
      }
      const url = changeURL.value;
      const userphoto = document.querySelector('.user-info-photo');
      if (url) {
        userphoto.src = url;
      }
    } else {
      // console.log(currentUser.password);
      modalModule.notice('Wrong password');
    }


    changeURL.value = '';
    changeLogin.value = '';
    changePassword.value = '';
    ev.stopImmediatePropagation();
    removeModalHandler();
  });
}
