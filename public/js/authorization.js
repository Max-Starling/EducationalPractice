function authorization(){
		var overlay = document.querySelector('.modal-overlay');
        var modalContent = document.getElementsByClassName("modal-content2")[0]; 
        var form = document.getElementsByClassName("authorization-form")[0];
        var inputLogin = document.getElementsByClassName("authorization-input")[0];
        document.getElementsByClassName("modal-title")[1].textContent = "AUTHORIZATION";
        inputLogin.placeholder = "@Max-Starling";
        inputLogin.className = "authorization-input form-style";
        inputLogin.style.marginTop = "1vw";    
        var inputPassword = document.getElementsByClassName("authorization-input")[1];
        inputPassword.style.marginTop = "1.5vw";
        inputPassword.type = "password";     
        inputPassword.placeholder = "yourpassword";
        inputPassword.className = "authorization-input form-style"; 
        inputPassword.maxLength = "24";
        inputPassword.style.color = "#aaaaaa";
        inputLogin.style.color = "#aaaaaa";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault(); 
        };        
        [].slice.call(document.querySelectorAll('.modal-trigger3')).forEach(		
            function(el, i){
                var modal = document.querySelector('#' + el.getAttribute('data-modal'));
                    function removeModalHandler(){
                        classie.remove(modal,'modal-show2');
                    }
                    el.addEventListener('click', 
                        function(){
                            classie.add(modal, 'modal-show2');
                            overlay.removeEventListener('click', removeModalHandler);
                            overlay.addEventListener('click', removeModalHandler);
                        }
 		            );
                    var close = modal.querySelector( '.md-close' );
					close.addEventListener('click', function(ev){
						    ev.stopPropagation();
                            var uname = inputLogin.value.toString();
                            var password = inputPassword.value.toString();
                            var correctUsername = false;
                            var correctPassword = false;
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
                            if(correctUsername && correctPassword){
                                username.textContent = uname;
                                userrank.textContent = "Administrator";
                                userrank.style.color = "#8b1500";
                                var addButton = document.getElementsByClassName("add-new-button")[0];
                                var editButton = document.getElementsByClassName("edit-new-button")[0];
                                var deleteButton = document.getElementsByClassName("delete-new-button")[0];
                                addButton.style.visibility = "inherit";
                                editButton.style.visibility = "inherit";
                                deleteButton.style.visibility = "inherit";
                                inputLogin.value = "";
                                inputPassword.value = "";
                                removeModalHandler();
                            }
					});
            }
	    );
}