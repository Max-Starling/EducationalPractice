    function editNew(parentModal, parentModalShow, ID, title, description, content){
		var overlay = document.querySelector('.modal-overlay2');
        var modalContent = document.getElementsByClassName("modal-content1")[0]; 
        var form = document.getElementsByClassName("add-new-form")[0];
        var inputURL = document.getElementsByClassName("add-new-input")[0];
        var modalTitle = document.getElementsByClassName("modal-title")[0].textContent;
        document.getElementsByClassName("modal-title")[0].textContent = "EDIT NEW";
        inputURL.placeholder = "Image URL";
        inputURL.type = "text";
        var inputTitle = document.getElementsByClassName("add-new-input")[1];
        inputTitle.style.marginTop = "0.5vw"     
        inputTitle.placeholder = "Title";
        inputTitle.type = "text";
        inputTitle.value = title;
        inputTitle.maxLength = "24";
        var inputShortDescription = document.getElementsByClassName("add-new-textarea")[0];
        inputShortDescription.style.marginTop = "0.5vw"
        inputShortDescription.maxLength = "80";
        inputShortDescription.value = description;
        var inputContent = document.getElementsByClassName("add-new-textarea")[1];
        inputContent.style.height = "9.6vw";
        inputContent.style.marginTop = "0.5vw";
        inputContent.maxLength = "1280";
        inputContent.value = content;
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault();
            var n = {
                title: "",
                summary: "",
                author: "You",
                content: "",
                img: ""
            }
            n.img = inputURL.value.toString();
            n.title = inputTitle.value.toString();
            n.summary = inputShortDescription.value.toString();
            n.content = inputContent.value.toString();
            newModel.editNew(ID, n);
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength());
            newRenderer.insertNewsInDOM(news);
        };
        const el = document.querySelector('.modal-trigger2');
        const modal = document.querySelector('#' + el.getAttribute('data-modal'));        
        function removeModalHandler(){
            classie.remove(modal,'modal-show1');
        }
        function removeParentModalHandler(){
            classie.remove(parentModal, parentModalShow);
        }
        el.addEventListener('click', 
            function(){
                classie.add(modal, 'modal-show1');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);
            }
 		);
        const close = modal.querySelector( '.md-close' );
		close.addEventListener('click', 
            function(ev){
			    ev.stopPropagation();
                removeParentModalHandler();
			    removeModalHandler();
			}
        );
    }