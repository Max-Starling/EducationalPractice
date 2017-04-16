    function contactUs(){
		var overlay = document.querySelector('.modal-overlay');
        var modalContent = document.querySelector('.modal-content7'); 
        var form = document.getElementsByClassName("contact-form")[0];
        modalContent.querySelector('.modal-title').textContent = "CONTACT US";

        var inputContent = form.getElementsByClassName("contact-textarea")[0];
        //inputContent.style.height = "9.6vw";
        //inputContent.style.marginTop = "0.5vw";
        inputContent.maxLength = "200";
        inputContent.placeholder = "You can leave here your opinion, critique or give us a fresh idea. Don't forget to name yourself ༼ つ ◕_◕ ༽つ";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault();
        };
        const el = document.querySelector('.modal-trigger8');
        const modal = document.querySelector('#' + el.getAttribute('data-modal'));        
        function removeModalHandler(){
            classie.remove(modal,'modal-show7');
        }
        el.addEventListener('click', 
            function(){
                classie.add(modal, 'modal-show7');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);
            }
 		);
        const close = modal.querySelector( '.md-close' );
		close.addEventListener('click', 
            function(ev){
			    ev.stopPropagation();
			    removeModalHandler();
			}
        );
    }