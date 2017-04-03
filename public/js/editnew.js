function editNew(){
		var overlay = document.querySelector('.modal-overlay');
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
        inputTitle.maxLength = "24";
        var inputShortDescription = document.getElementsByClassName("add-new-textarea")[0];
        inputShortDescription.style.marginTop = "0.5vw"
        inputShortDescription.maxLength = "80";
        var inputContent = document.getElementsByClassName("add-new-textarea")[1];
        inputContent.style.height = "9.6vw";
        inputContent.style.marginTop = "0.5vw";
        inputContent.maxLength = "1280";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault();
            var n = {
                ID: (newModel.getLength() + 1) + '',
                title: "",
                summary: "",
                createdAt: "",
                author: "You",
                content: "",
                img: ""
            }
            var correctID = getID();
            n.img = inputURL.value.toString();
            n.title = inputTitle.value.toString();
            n.summary = inputShortDescription.value.toString();
            n.content = inputContent.value.toString();
            newModel.editNew(correctID,n);
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength());
            newRenderer.insertNewsInDOM(news);
            inputURL.value = "";
            inputContent.value = "";
            inputShortDescription.value = "";
            inputTitle.value = "";
        };        
        [].slice.call(document.querySelectorAll('.modal-trigger2')).forEach(		
            function(el, i){
                var modal = document.querySelector('#' + el.getAttribute('data-modal'));
                    function removeModalHandler(){
                        classie.remove(modal,'modal-show1');
                    }
                    el.addEventListener('click', 
                        function(){
                            classie.add(modal, 'modal-show1');
                            overlay.removeEventListener('click', removeModalHandler);
                            overlay.addEventListener('click', removeModalHandler);
                        }
 		            );
                    var close = modal.querySelector( '.md-close' );
					close.addEventListener('click', function(ev){
						ev.stopPropagation();
						removeModalHandler();
					});
            }
	    );
}