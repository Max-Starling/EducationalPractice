//var noticeModule =(
//function (){
        function notice(message, parentModal, parentModalShow, newID){
            const overlay = document.querySelector('.modal-overlay2');
            const modalContent = document.querySelector('.modal-content6');

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
            function removeParentModalHandler(){
                classie.remove(parentModal, parentModalShow);
            }
            el.addEventListener('click', 
                function(){
                    classie.add(modal, 'modal-show6');
                    overlay.removeEventListener('click', removeModalHandler);
                    overlay.addEventListener('click', removeModalHandler);
                }
            );
            console.log("nid" + newID);
            const buttonYes = modal.querySelector('.button-yes');
            buttonYes.onclick = function(ev){
                //console.log("nid" + newID);
                newRenderer.removeNewsFromDom();
                newModel.removeNew(newID);
                console.log(newModel.getLength());
                const news = newModel.getNews(0, newModel.getLength());
                newRenderer.insertNewsInDOM(news);
                removeModalHandler();
                removeParentModalHandler();
                event.stopImmediatePropagation();
            }
//);
            const buttonNo = modal.querySelector('.button-no');
            buttonNo.onclick = function(ev){
                ev.stopPropagation();
                removeModalHandler();
            }
            /*buttonNo.addEventListener('click', 
                function(ev){
                        ev.stopPropagation();
                        removeModalHandler();
                }
            );*/
        }
     /*       return {
                changeState: changeState,
                getState: getState,
                notice: notice
        };
    }()
);

noticeModule.getState();*/


/*document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    //userInfo.getUserName();
    noticeModule.getState();
}*/