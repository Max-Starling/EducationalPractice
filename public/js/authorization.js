function authorization(){
    document.getElementsByClassName("modal-title")[2].textContent = "AUTHORIZATION";
	const overlay = document.querySelector('.modal-overlay');
    const modalContent = document.getElementsByClassName("modal-content2")[0];
    //  Form  //
    const form = document.getElementsByClassName("authorization-form")[0];
    form.spellcheck = false;
    form.onsubmit = function(event){
        event.preventDefault(); 
    };
    //  Login  //
    const inputLogin = document.getElementsByClassName("authorization-input")[0];
    inputLogin.className = "authorization-input form-style";
    inputLogin.maxLength = "16";
    inputLogin.placeholder = "@Max-Starling";
    inputLogin.style.color = "#aaaaaa";
    inputLogin.style.marginTop = "1vw";    
    //  Password  //
    const inputPassword = document.getElementsByClassName("authorization-input")[1];
    inputPassword.className = "authorization-input form-style";
    inputPassword.maxLength = "16";
    inputPassword.placeholder = "yourpassword";
    inputPassword.style.color = "#aaaaaa";    
    inputPassword.style.marginTop = "1.5vw";
    inputPassword.type = "password";
        
    const el = document.querySelector('.modal-trigger3');
    const modal = document.querySelector('#' + el.getAttribute('data-modal'));
    function removeModalHandler(){
        classie.remove(modal,'modal-show2');
    }
    el.addEventListener(
        'click', function(){
            classie.add(modal, 'modal-show2');
            overlay.removeEventListener('click', removeModalHandler);
            overlay.addEventListener('click', removeModalHandler);
        }
 	);
    //  Check & Close  //
    const close = modal.querySelector( '.md-close' );
	close.addEventListener(
            'click', function(ev){
                //  Getting values from the form.  //  
                const uname = inputLogin.value.toString();
                const password = inputPassword.value.toString();
                //  Checking values for correctness.  //
                let correctLogin = false;
                if(inputLogin.value.length > 0){
                    correctLogin = true;
                    inputLogin.style.color = "#aaaaaa";
                }else if(inputLogin.value.length < 1){
                    inputLogin.style.color = "#8b1500";
                }
                let correctPassword = false;
                if(inputPassword.value.length >= 4){
                    correctPassword = true;
                    inputPassword.style.color = "#aaaaaa";
                }else if(inputPassword.value.length < 4){
                    inputPassword.style.color = "#8b1500";
                }
                if(correctLogin && correctPassword){
                    //  Setting user info.  //
                    const userName = document.getElementsByClassName("user-info-name")[0];
                    userName.textContent = uname;
                    const userRank = document.getElementsByClassName("user-info-rank")[0];
                    userRank.textContent = "Administrator";
                    userRank.style.color = "#8b1500";
                    //  Displaying buttons to work with news.  //
                    const addButton = document.getElementsByClassName("add-new-button")[0];
                    addButton.style.visibility = "inherit";
                    const editButton = document.getElementsByClassName("edit-new-button")[0];
                    editButton.style.visibility = "inherit";
                    const deleteButton = document.getElementsByClassName("delete-new-button")[0];
                    deleteButton.style.visibility = "inherit";
                    //  Changing menu items.  //
                    const login = document.getElementsByClassName("login")[0];
                    login.style.display = "none";
                    const logout = document.getElementsByClassName("logout")[0];
                    logout.style.display = "inherit";
                    const profile = document.getElementsByClassName("profile")[0];
                    profile.style.display = "inherit";
                    const register = document.getElementsByClassName("register")[0];
                    register.style.display = "none"; 
                    //  Zeroing values in the form.  //
                    inputLogin.value = "";
                    inputPassword.value = "";
                    //  Closing modal window.  //
                    ev.stopPropagation();
                    removeModalHandler();
                }
			}
        );
    }