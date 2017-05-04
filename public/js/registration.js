function registration() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  // const modalContent = document.getElementsByClassName('modal-content-reg')[0]
  //  Form  //
  const form = document.getElementsByClassName('registration-form')[0];
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  //  Email  //
  const inputEmail = document.getElementsByClassName('registration-input')[0];
  inputEmail.className = 'registration-input form-style';
  inputEmail.maxLength = '32';
  inputEmail.placeholder = 'Email';
  inputEmail.style.color = '#aaaaaa';
  inputEmail.style.marginTop = '0.5vw';
  //  Login  //
  const inputLogin = document.getElementsByClassName('registration-input')[1];
  inputLogin.className = 'registration-input form-style';
  inputLogin.maxLength = '16';
  inputLogin.placeholder = '@Max-Starling';
  inputLogin.style.color = '#aaaaaa';
  inputLogin.style.marginTop = '1.5vw';
  //  Password  //
  const inputPassword = document.getElementsByClassName('registration-input')[
    2
  ];
  inputPassword.className = 'registration-input form-style';
  inputPassword.maxLength = '16';
  inputPassword.placeholder = 'yourpassword';
  inputPassword.style.color = '#aaaaaa';
  inputPassword.style.marginTop = '1.5vw';
  inputPassword.type = 'password';

  const el = document.querySelector('.modal-trigger4');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'modal-show3');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'modal-show3');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  //  Check & Close  //
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (ev) => {
    //  Getting values from the form.  //
    // const email = inputEmail.value.toString()
    const uname = inputLogin.value.toString();
    // const password = inputPassword.value.toString()
    //  Checking values for correctness.  //
    let correctEmail = false;
    if (inputEmail.value.length >= 5) {
      correctEmail = true;
      inputEmail.style.color = '#aaaaaa';
    } else if (inputEmail.value.length < 5) {
      inputEmail.style.color = '#8b1500';
    }
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
    if (correctEmail && correctLogin && correctPassword) {
      //  Setting user info.  //
      const username = document.getElementsByClassName('user-info-name')[0];
      username.textContent = uname;
      const userrank = document.getElementsByClassName('user-info-rank')[0];
      userrank.textContent = 'Administrator';
      userrank.style.color = '#8b1500';
      //  Displaying buttons to work with news.  //
      const addButton = document.getElementsByClassName('add-new-button')[0];
      addButton.style.visibility = 'inherit';
      const editButton = document.getElementsByClassName('edit-new-button')[0];
      editButton.style.visibility = 'inherit';
      const deleteButton = document.getElementsByClassName('delete-new-button')[
        0
      ];
      deleteButton.style.visibility = 'inherit';
      //  Changing menu items.  //
      const login = document.getElementsByClassName('login')[0];
      login.style.display = 'none';
      const logout = document.getElementsByClassName('logout')[0];
      logout.style.display = 'inherit';
      const profile = document.getElementsByClassName('profile')[0];
      profile.style.display = 'inherit';
      const register = document.getElementsByClassName('register')[0];
      register.style.display = 'none';
      //  Zeroing values in the form.  //
      inputEmail.value = '';
      inputLogin.value = '';
      inputPassword.value = '';
      //  Closing modal window.  //
      ev.stopPropagation();
      removeModalHandler();
    }
  });
}
exports = {
  singup: registration,
};
