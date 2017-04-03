function registration(){
		var overlay = document.querySelector('.modal-overlay');
        var modalContent = document.getElementsByClassName("modal-content3")[0]; 
        var form = document.getElementsByClassName("registration-form")[0];
        document.getElementsByClassName("modal-title")[2].textContent = "REGISTRATION";
        var inputEmail = document.getElementsByClassName("registration-input")[0];
        inputEmail.placeholder = "Email";
        inputEmail.className = "registration-input form-style";
        inputEmail.style.marginTop = "0.5vw";    
        var inputLogin = document.getElementsByClassName("registration-input")[1];
        inputLogin.placeholder = "@Max-Starling";
        inputLogin.className = "registration-input form-style";
        inputLogin.style.marginTop = "1.5vw";    
        var inputPassword = document.getElementsByClassName("registration-input")[2];
        inputPassword.style.marginTop = "1.5vw";
        inputPassword.type = "password";     
        inputPassword.placeholder = "yourpassword";
        inputPassword.className = "registration-input form-style"; 
        inputPassword.maxLength = "24";
        inputEmail.style.color = "#aaaaaa";
        inputPassword.style.color = "#aaaaaa";
        inputLogin.style.color = "#aaaaaa";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault();
            event.stopPropagation(); 
        };        
        [].slice.call(document.querySelectorAll('.modal-trigger4')).forEach(		
            function(el, i){
                var modal = document.querySelector('#' + el.getAttribute('data-modal'));
                    function removeModalHandler(){
                        classie.remove(modal,'modal-show3');
                    }
                    el.addEventListener('click', 
                        function(){
                            classie.add(modal, 'modal-show3');
                            overlay.removeEventListener('click', removeModalHandler);
                            overlay.addEventListener('click', removeModalHandler);
                        }
 		            );
                    var close = modal.querySelector( '.md-close' );
					close.addEventListener('click', function(ev){
						    ev.stopPropagation();
                            var email = inputEmail.value.toString();
                            var uname = inputLogin.value.toString();
                            var password = inputPassword.value.toString();
                            var correctEmail = false;
                            var correctUsername = false;
                            var correctPassword = false;
                            if(inputEmail.value.length >= 5 && inputEmail.value.length <= 16){
                                correctEmail = true;
                                inputEmail.style.color = "#aaaaaa";
                            }else if(inputEmail.value.length > 16 || inputEmail.value.length < 5){
                                inputEmail.style.color = "#8b1500";
                            }
                            if(inputLogin.value.length > 0 && inputLogin.value.length <= 16){
                                correctUsername = true;
                                inputLogin.style.color = "#aaaaaa";
                            }else if(inputLogin.value.length > 16 || inputLogin.value.length < 1){
                                inputLogin.style.color = "#8b1500";
                            }
                            if(inputPassword.value.length >= 4 && inputPassword.value.length <= 16){
                                correctPassword = true;
                                inputPassword.style.color = "#aaaaaa";
                            }else if(inputPassword.value.length > 16 || inputPassword.value.length < 4){
                                inputPassword.style.color = "#8b1500";
                            }
                            var username = document.getElementsByClassName("user-info-name")[0];
                            var userrank = document.getElementsByClassName("user-info-rank")[0];
                            if(correctEmail && correctUsername && correctPassword){
                                username.textContent = uname;
                                userrank.textContent = "Administrator";
                                userrank.style.color = "#8b1500";
                                var addButton = document.getElementsByClassName("add-new-button")[0];
                                var editButton = document.getElementsByClassName("edit-new-button")[0];
                                var deleteButton = document.getElementsByClassName("delete-new-button")[0];
                                addButton.style.visibility = "inherit";
                                editButton.style.visibility = "inherit";
                                deleteButton.style.visibility = "inherit";
                                inputEmail.value = "";
                                inputLogin.value = "";
                                inputPassword.value = "";
                                removeModalHandler();
                            }
					});
            }
	    );
}