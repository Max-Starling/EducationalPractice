/* global document, event, window, classie, newsModal, currentUser, usersService */
(function (window) {
  /**
   * SWITCH MODE
   */
  function noticeTrigger(message, func) {
    const notice = document.querySelector('.md-trigger7');
    if (func) {
      notice.addEventListener('click', newsModal.notice(message, func));
    } else {
      notice.addEventListener('click', newsModal.notice(message));
    }
    notice.click();
    notice.removeEventListener('click', {});
  }
  function switchMode(user) {
    if (user) {
      currentUser.username = user.username;
      currentUser.password = user.password;
      //  Setting user info.  //
      const userName = document.querySelector('.user-info-name');
      userName.textContent = user.username;
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
    } else {
      const userName = document.querySelector('.user-info-name');
      userName.textContent = 'Unknown';
      currentUser.username = 'Unknown';
      //  Rank  //
      const userRank = document.querySelector('.user-info-rank');
      userRank.textContent = 'Guest';
      userRank.style.color = '#525659';
      currentUser.rank = 'Guest';
      //  Image  //
      document.querySelector('.user-info-photo').src =
        'images/users/guest_photo.jpg';
      currentUser.img = 'images/users/guest_photo.jpg';
      //  Hiding buttons to work with news.  //
      const addButton = document.querySelector('.add-new-button');
      addButton.style.visibility = 'hidden';
      const editButton = document.querySelector('.edit-new-button');
      editButton.style.visibility = 'hidden';
      const deleteButton = document.querySelector('.delete-new-button');
      deleteButton.style.visibility = 'hidden';
      //  Changing menu items.  //
      document.querySelector('.logout').style.display = 'none';
      document.querySelector('.login').style.display = 'inherit';
      document.querySelector('.register').style.display = 'inherit';
      document.querySelector('.profile').style.display = 'none';
    }
  }
  /**
   * AUTHORIZATION
   */
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
    inputLogin.style.marginTop = '0.5vw';
    //  Password  //
    const inputPassword = form.querySelectorAll('.authorization-input')[1];
    inputPassword.className = 'authorization-input form-style';
    inputPassword.maxLength = '16';
    inputPassword.placeholder = 'yourpassword';
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
      //  Trying to log in  //
      usersService.logIn({ username: uname, password: upass })
        .then((user) => {
          //  Return normal colors.  //
          inputPassword.style.color = '#aaaaaa';
          inputLogin.style.color = '#aaaaaa';
          //  Switch mode.  //
          switchMode(user);
          //  Show message.  //
          noticeTrigger('Welcome back!');
          //  Zeroing values in the form.  //
          inputLogin.value = '';
          inputPassword.value = '';
          //  Closing modal window.  //
          ev.stopPropagation();
          removeModalHandler();
        })
        .catch((reason) => {
          console.log(`Handle rejected promise, because: ${reason}.`);
          //  Set red colors.  //
          inputPassword.style.color = '#8b1500';
          inputLogin.style.color = '#8b1500';
          //  Show message.  //
          noticeTrigger('Wrong username or password.');
          //  Zeroing value in the form.  //
          inputPassword.value = '';
          ev.stopPropagation();
        });
    });
  }

  /**
   * REGISTRATION
   */
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
    inputLogin.placeholder = '@MaxStarling';
    inputLogin.style.marginTop = '0.5vw';
    //  Password  //
    const inputPassword = form.querySelectorAll('.registration-input')[1];
    inputPassword.className = 'registration-input form-style';
    inputPassword.maxLength = '16';
    inputPassword.placeholder = 'yourpassword';
    inputPassword.style.marginTop = '1.5vw';
    inputPassword.type = 'password';
    //  Password  again  //
    const inputPasswordAgain = form.querySelectorAll('.registration-input')[2];
    inputPasswordAgain.className = 'registration-input form-style';
    inputPasswordAgain.maxLength = '16';
    inputPasswordAgain.placeholder = 'passwordagain';
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
      const uName = inputLogin.value;
      const uPass = inputPassword.value;
      const uPassAgain = inputPasswordAgain.value;
      //  Checking values for correctness.  //
      let correctPassword = false;
      if (uPass.length >= 4) {
        correctPassword = true;
        inputPassword.style.color = '#aaaaaa';
      } else if (uPass.length < 4) {
        inputPassword.style.color = '#8b1500';
      }
      let correctPasswordAgain = false;
      if (uPassAgain === uPass) {
        correctPasswordAgain = true;
      } else {
        correctPasswordAgain = false;
      }
      //  Checking if user is alredy exist  //
      if (uName && correctPasswordAgain) {
        usersService.checkUser(uName)
          .then((occurrences) => {
            console.log(occurrences.length);
            inputPassword.style.color = '#aaaaaa';
            inputPasswordAgain.style.color = '#aaaaaa';
            if (!occurrences.length) {
              usersService.registerUser({
                username: uName,
                password: inputPassword.value,
                img: '',
                rank: 'User',
              });
              inputLogin.style.color = '#aaaaaa';
              noticeTrigger('You was successfully registred on this site!');
              removeModalHandler();
            } else {
              noticeTrigger('User with this username is already exist.');
              inputLogin.style.color = '#8b1500';
            }
            //  Zeroing values in the form.  //
            inputLogin.value = '';
            inputPassword.value = '';
            inputPasswordAgain.value = '';
            //  Closing modal window.  //
            ev.stopPropagation();
          })
          .catch((reason) => {
            console.log(`Handle rejected promise, because: ${reason}.`);
            ev.stopPropagation();
            removeModalHandler();
          });
      } else {
        noticeTrigger('Please, enter the same password twice.');
        inputPassword.value = '';
        inputPasswordAgain.value = '';
        inputPassword.style.color = '#8b1500';
        inputPasswordAgain.style.color = '#8b1500';
      }
    });
  }
  /**
   * PROFILE
   */
  function profile() {
    const overlay = document.querySelector('.fisrt-overlay-layer');
    //  Form  //
    const form = document.querySelector('.profile-form');
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
    };
    //  Image  //
    const inputURL = form.querySelectorAll('.profile-input')[0];
    inputURL.placeholder = 'URL to new picture';
    inputURL.className = 'profile-input form-style';
    //  Login  //
    const inputLogin = form.querySelectorAll('.profile-input')[1];
    inputLogin.placeholder = '@NewLogin';
    inputLogin.className = 'profile-input form-style';
    inputLogin.style.marginTop = '1vw';
    inputLogin.maxLength = '16';
    //  Password  //
    const inputPassword = form.querySelectorAll('.profile-input')[2];
    inputPassword.placeholder = 'yourpassword';
    inputPassword.className = 'profile-input form-style';
    inputPassword.style.marginTop = '1vw';
    inputPassword.type = 'password';
    inputPassword.maxLength = '16';

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
      const password = inputPassword.value.toString();
      console.log(password);
      usersService.checkPassword(password)
        .then((state) => {
          console.log(state);
          if (state) {
            const uname = inputLogin.value.toString();
            console.log(uname);
            const username = document.querySelector('.user-info-name');
            //  Image  //
            const image = inputURL.value;
            const userphoto = document.querySelector('.user-info-photo');
            if (image) {
              usersService.changeImage(currentUser.username.toString(), image.toString())
                .then(() => {
                  userphoto.src = image.toString();
                  currentUser.img = image.toString();
                  noticeTrigger('Image was successfully changed.');
                })
                .catch((reason) => {
                  console.log(`Handle rejected promise, because: ${reason}.`);
                  ev.stopPropagation();
                  removeModalHandler();
                });
            }
            //  Name  //
            if (uname) {
              console.log(uname);
              usersService.checkUser(uname)
                .then((occurrences) => {
                  console.log(occurrences);
                  if (!occurrences.length) {
                    console.log('yes');
                    console.log(currentUser.username, uname);
                    usersService.changeUsername(currentUser.username.toString(), uname.toString())
                      .then(() => {
                        username.textContent = uname.toString();
                        currentUser.username = uname.toString();
                        noticeTrigger('Username was successfully changed.');
                      })
                      .catch((reason) => {
                        console.log(`Handle rejected promise, because: ${reason}.`);
                        ev.stopPropagation();
                        removeModalHandler();
                      });
                  } else {
                    noticeTrigger('User with this username is already exist.');
                    inputLogin.value = '';
                    inputPassword.value = '';
                  }
                })
                .catch((reason) => {
                  console.log(`Handle rejected promise, because: ${reason}.`);
                  ev.stopPropagation();
                  removeModalHandler();
                });
            }
            inputURL.value = '';
            inputLogin.value = '';
            inputPassword.value = '';
            ev.stopImmediatePropagation();
            removeModalHandler();
          } else {
            noticeTrigger('Wrong password');
            inputPassword.value = '';
          }
        });
      ev.stopImmediatePropagation();
    });
  }

  /**
   * SETTINGS
   */
  function settings() {
    const overlay = document.querySelector('.fisrt-overlay-layer');
    //  Form  //
    const form = document.querySelector('.settings-form');
    form.spellcheck = false;
    form.onsubmit = function (event) {
      event.preventDefault();
    };

    const slider = document.querySelector('.slider');
    const el = document.querySelector('.md-trigger6');
    const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
    function removeModalHandler() {
      classie.remove(modal, 'md-show5');
    }
    el.addEventListener('click', () => {
      classie.add(modal, 'md-show5');
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
  /**
   * CONTACT US
   */
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
      if (inputMention.value) {
        const m = {
          username: currentUser.username,
          mention: inputMention.value.toString(),
        };
        // console.log(m);
        usersService.addMention(m).then(() => {
          noticeTrigger('Your mention was successfully saved! Thank you :)');
          ev.stopPropagation();
          removeModalHandler();
        })
        .catch((reason) => {
          console.log(`Handle rejected promise, because: ${reason}.`);
          ev.stopPropagation();
          removeModalHandler();
        });
      }
    });
  }
  /**
   * EXIT
   */
  function exit() {
    //  Username  //
    usersService.logOut()
      .then(() => {
        noticeTrigger('Are you sure want to log out?', switchMode);
        event.stopPropagation();
      })
      .catch((reason) => {
        console.log(`Handle rejected promise, because: ${reason}.`);
        event.stopPropagation();
      });
  }
  const usersModal = {
    switchMode,
    noticeTrigger,
    authorization,
    registration,
    contactUs,
    settings,
    profile,
    exit,
  };
  window.usersModal = usersModal;
}(window));
