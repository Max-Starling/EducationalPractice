(function(window){
    'use strict';
        
    var notice = function(message, parentModal, parentModalShow, newID){
        const overlay = document.querySelector('.modal-overlay2');
        const modalContent = document.querySelector('.modal-content6');
        console.log("qqq");
        modalContent.querySelector('.modal-title').textContent = "NOTICE";
        modalContent.querySelector('.message').textContent = message;
            //  Form  //
        const form = document.querySelector('.notice-form');
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault(); 
        };
                
        const el = document.querySelector('.modal-trigger7');
        const modal = document.querySelector('#' + el.getAttribute('data-modal'));
        function removeModalHandler(){
            classie.remove(modal,'modal-show6');
        }
        
        el.addEventListener('click', 
            function(){
                classie.add(modal, 'modal-show6');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);
            }
        );

        const buttonYes = modal.querySelector('.button-yes');
        const buttonSure = modal.querySelector('.button-sure');
        const buttonNo = modal.querySelector('.button-no');

        if(parentModal && parentModalShow && newID){
            function removeParentModalHandler(){
                classie.remove(parentModal, parentModalShow);
            }
            buttonSure.style.display = "none";
            buttonYes.onclick = function(ev){
                newRenderer.removeNewsFromDom();
                newModel.removeNew(newID);
                const news = newModel.getNews(0, newModel.getLength());
                newRenderer.insertNewsInDOM(news);
                removeModalHandler();
                removeParentModalHandler();
                event.stopImmediatePropagation();
            }
            buttonNo.onclick = function(ev){
                ev.stopPropagation();
                removeModalHandler();
            }
        }else{
            console.log("qqqq");
            buttonYes.style.display = "none";
            buttonNo.style.display = "none";
            buttonSure.onclick = function(ev){
                removeModalHandler();
                event.stopImmediatePropagation();
            }
        }
    }
    var modalModule = {
        notice:notice
    };
    window.modalModule = modalModule;
})(window);
