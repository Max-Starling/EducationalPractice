/* global document, event, window, classie, currentUser, usersService */
function registration() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  //  Form  //
  const form = document.querySelector('.registration-form');
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  //  Login  //
  const inputLogin = form.querySelectorAll('.registration-input')[0];
  inputLogin.className = 'registration-input form-style';
  inputLogin.maxLength = '32';
  inputLogin.placeholder = '@Max-Starling';
  inputLogin.style.color = '#aaaaaa';
  inputLogin.style.marginTop = '1.5vw';
  //  Password  //
  const inputPassword = form.querySelectorAll('.registration-input')[1];
  inputPassword.className = 'registration-input form-style';
  inputPassword.maxLength = '16';
  inputPassword.placeholder = 'yourpassword';
  inputPassword.style.color = '#aaaaaa';
  inputPassword.style.marginTop = '1.5vw';
  inputPassword.type = 'password';
  //  Password  again  //
  const inputPasswordAgain = form.querySelectorAll('.registration-input')[2];
  inputPasswordAgain.className = 'registration-input form-style';
  inputPasswordAgain.maxLength = '16';
  inputPasswordAgain.placeholder = 'yourpasswordagain';
  inputPasswordAgain.style.color = '#aaaaaa';
  inputPasswordAgain.style.marginTop = '1.5vw';
  inputPasswordAgain.type = 'password';

  const el = document.querySelector('.md-trigger4');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'md-show3');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'md-show3');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  //  Check & Close  //
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (ev) => {
    //  Getting values from the form.  //
    const uName = inputLogin.value.toString();
    const uPass = inputPassword.value.toString();
    const uPassAgain = inputPassword.value.toString();
    //  Checking values for correctness.  //
    let correctLogin = false;
    if (inputLogin.value.length > 0) {
      correctLogin = true;
      inputLogin.style.color = '#aaaaaa';
    } else if (inputLogin.value.length < 1) {
      inputLogin.style.color = '#8b1500';
    }
    let correctPassword = false;
    if (inputPassword.value.length >= 4) {
      correctPassword = true;
      inputPassword.style.color = '#aaaaaa';
    } else if (inputPassword.value.length < 4) {
      inputPassword.style.color = '#8b1500';
    }
    let correctPasswordAgain = false;
    if (inputPasswordAgain.value === inputPassword.value) {
      correctPasswordAgain = true;
    } else {
      correctPasswordAgain = false;
    }
    //  Checking if user is alredy exist  //
    if (
      correctLogin &&
      correctPassword &&
      correctPasswordAgain &&
      !usersService.checkUser(uName)
    ) {
      currentUser.user = uName;
      currentUser.password = uPass;
      //  Setting user info.  //
      const username = document.querySelector('.user-info-name');
      username.textContent = uName;
      const userrank = document.querySelector('.user-info-rank');
      userrank.textContent = 'User';
      userrank.style.color = '#505C8B';
      currentUser.rank = 'User';
      usersService.registerUser(currentUser);
      //  Displaying buttons to work with news.  //
      const addButton = document.querySelector('.add-new-button');
      addButton.style.visibility = 'inherit';
      const editButton = document.querySelector('.edit-new-button');
      editButton.style.visibility = 'inherit';
      const deleteButton = document.querySelector('.delete-new-button');
      deleteButton.style.visibility = 'inherit';
      //  Changing menu items.  //
      const login = document.querySelector('.login');
      login.style.display = 'none';
      const logout = document.querySelector('.logout');
      logout.style.display = 'inherit';
      const profile = document.querySelector('.profile');
      profile.style.display = 'inherit';
      const register = document.querySelector('.register');
      register.style.display = 'none';
      //  Zeroing values in the form.  //
      inputLogin.value = '';
      inputPassword.value = '';
      inputPasswordAgain.value = '';
      //  Closing modal window.  //
      ev.stopPropagation();
      removeModalHandler();
    }
  });
}
exports = {
  singup: registration,
};
