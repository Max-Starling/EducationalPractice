function profile(){
		var overlay = document.querySelector('.modal-overlay');
        var modalContent = document.getElementsByClassName("modal-content4")[0]; 
        var form = document.getElementsByClassName("settings-form")[0];
        document.getElementsByClassName("modal-title")[3].textContent = "SETTINGS";
        var changeURL = document.getElementsByClassName("settings-input")[0];
        changeURL.placeholder = "URL to new picture";
        changeURL.className = "settings-input form-style";
        changeURL.style.color = "#aaaaaa";
        var changeLogin = document.getElementsByClassName("settings-input")[1];
        changeLogin.placeholder = "@NewLogin";
        changeLogin.className = "settings-input form-style";
        changeLogin.style.marginTop = "1vw";
        changeLogin.maxLength = "16";     
        changeLogin.style.color = "#aaaaaa";
        var changePassword = document.getElementsByClassName("settings-input")[2];
        changePassword.placeholder = "yournewpassword";
        changePassword.className = "settings-input form-style";
        changePassword.style.marginTop = "1vw";  
        changePassword.type = "password";
        changePassword.maxLength = "16";     
        changePassword.style.color = "#aaaaaa";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault(); 
        };        
        [].slice.call(document.querySelectorAll('.modal-trigger5')).forEach(		
            function(el, i){
                var modal = document.querySelector('#' + el.getAttribute('data-modal'));
                    function removeModalHandler(){
                        classie.remove(modal,'modal-show4');
                    }
                    el.addEventListener('click', 
                        function(){
                            classie.add(modal, 'modal-show4');
                            overlay.removeEventListener('click', removeModalHandler);
                            overlay.addEventListener('click', removeModalHandler);
                        }
 		            );
                    var close = modal.querySelector('.md-close');
					close.addEventListener('click', function(ev){
						ev.stopPropagation();
                        var url = changeURL.value;
                        var uname = changeLogin.value.toString();
                        var password = changePassword.value.toString();
                        var correctLogin = true;
                        var correctPassword = true;
                        if(changeLogin.value.length > 0){
                            correctLogin = true;
                            changeLogin.style.color = "#aaaaaa";
                        }else if(changeLogin.value.length < 1){
                            //correctLogin = false;
                            changeLogin.style.color = "#8b1500";
                        }
                        if(changePassword.value.length >= 4){
                            correctPassword = true;
                            changePassword.style.color = "#aaaaaa";
                        }else if(changePassword.value.length < 4){
                            //correctPassword = false;
                            changePassword.style.color = "#8b1500";
                        }
                        var username = document.getElementsByClassName("user-info-name")[0];
                        var userphoto = document.getElementsByClassName("user-info-photo")[0];
                        //alert(correctLogin);
                        //alert(correctPassword);
                        if(correctLogin && correctPassword){
                            if(uname){
                                username.textContent = uname;
                            }
                            if(url){
                                userphoto.src = url;
                            }
                            changeURL.value = "";
                            changeLogin.value = "";
                            changePassword.value = "";
                            ev.stopImmediatePropagation();
                            removeModalHandler();
                        }
				});
            }
	    );
}