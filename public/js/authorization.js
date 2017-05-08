/* global document, event, window, classie, currentUser, newsService, usersService */
function authorization() {
  const overlay = document.querySelector('.fisrt-overlay-layer');
  // const modalContent = document.getElementsByClassName('md-content-auth')[0]
  //  Form  //
  const form = document.querySelector('.authorization-form');
  form.spellcheck = false;
  form.onsubmit = function (event) {
    event.preventDefault();
  };
  //  Login  //
  const inputLogin = form.querySelectorAll('.authorization-input')[0];
  inputLogin.className = 'authorization-input form-style';
  inputLogin.maxLength = '16';
  inputLogin.placeholder = '@MaxStarling';
  inputLogin.style.color = '#aaaaaa';
  inputLogin.style.marginTop = '0.5vw';
  //  Password  //
  const inputPassword = form.querySelectorAll('.authorization-input')[1];
  inputPassword.className = 'authorization-input form-style';
  inputPassword.maxLength = '16';
  inputPassword.placeholder = 'yourpassword';
  inputPassword.style.color = '#aaaaaa';
  inputPassword.style.marginTop = '1.5vw';
  inputPassword.type = 'password';

  const el = document.querySelector('.md-trigger3');
  const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
  function removeModalHandler() {
    classie.remove(modal, 'md-show2');
  }
  el.addEventListener('click', () => {
    classie.add(modal, 'md-show2');
    overlay.removeEventListener('click', removeModalHandler);
    overlay.addEventListener('click', removeModalHandler);
  });
  //  Check & Close  //
  const close = modal.querySelector('.md-close');
  close.addEventListener('click', (ev) => {
    //  Getting values from the form.  //
    const uname = inputLogin.value.toString();
    const upass = inputPassword.value.toString();
    //  Checking login  //
    let correctLogin = false;
    if (inputLogin.value.length > 0) {
      correctLogin = true;
      inputLogin.style.color = '#aaaaaa';
    } else if (inputLogin.value.length < 1) {
      inputLogin.style.color = '#8b1500';
    }
    //  Checking password  //
    let correctPassword = false;
    if (inputPassword.value.length >= 4) {
      correctPassword = true;
      inputPassword.style.color = '#aaaaaa';
    } else if (inputPassword.value.length < 4) {
      inputPassword.style.color = '#8b1500';
    }
    console.log('authorization.js:');
    console.log(uname, upass);
    const user = usersService.checkUser(uname, upass);
    if (user) {
      currentUser.user = uname;
      currentUser.password = upass;
      //  Setting user info.  //
      const userName = document.querySelector('.user-info-name');
      userName.textContent = uname;
      const userRank = document.querySelector('.user-info-rank');
      if (user.rank === 'Administrator') {
        userRank.textContent = user.rank;
        userRank.style.color = '#8b1500';
        currentUser.rank = 'Administrator';
      }
      if (user.rank === 'Moderator') {
        userRank.textContent = user.rank;
        userRank.style.color = '#2075a4';
        currentUser.rank = 'Moderator';
      }
      if (user.rank === 'User') {
        userRank.textContent = user.rank;
        userRank.style.color = '#505C8B';
        currentUser.rank = 'User';
      }
      if (user.img) {
        document.querySelector('.user-info-photo').src = user.img;
        currentUser.img = user.img;
      }
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
      //  Closing modal window.  //
      ev.stopPropagation();
      removeModalHandler();
    } else {
      ev.stopPropagation();
      removeModalHandler();
    }
  });
}
