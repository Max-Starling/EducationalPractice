function addNew(){
		var overlay = document.querySelector('.modal-overlay');
        var modalContent = document.getElementsByClassName("modal-content1")[0]; 
        var form = document.getElementsByClassName("add-new-form")[0];
        var inputURL = document.getElementsByClassName("add-new-input")[0];
        document.getElementsByClassName("modal-title")[0].textContent = "ADD NEW";
        inputURL.placeholder = "Image URL";
        inputURL.type = "text";
        inputURL.value = "";
        var inputTitle = document.getElementsByClassName("add-new-input")[1];
        inputTitle.style.marginTop = "0.5vw"     
        inputTitle.placeholder = "Title";
        inputTitle.type = "text";
        inputTitle.maxLength = "24";
        inputTitle.value = "";
        var inputShortDescription = document.getElementsByClassName("add-new-textarea")[0];
        inputShortDescription.style.marginTop = "0.5vw"
        inputShortDescription.maxLength = "80";
        inputShortDescription.value = "";
        var inputContent = document.getElementsByClassName("add-new-textarea")[1];
        inputContent.style.height = "9.6vw";
        inputContent.style.marginTop = "0.5vw";
        inputContent.maxLength = "1280";
        inputContent.value = "";
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault();
        };        
        [].slice.call(document.querySelectorAll('.modal-trigger1')).forEach( 				
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
                        var n = {
                            ID: (newModel.getLength() + 1) + '',
                            title: "",
                            summary: "",
                            createdAt: new Date(),
                            author: "You",
                            content: "",
                            img: ""
                        }
                        var ID = newModel.getLength() + 1;
                        var correctID = "";
                        if(ID >= 10){
                            correctID = "00" + ID;
                        }else if(ID >= 100){
                            correctID = "0" + ID;
                        }else if(ID >= 1000){
                            correctID = ID;
                        }else{
                            correcID = "000" + ID;
                        }
                        n.img = inputURL.value.toString();
                        n.title = inputTitle.value.toString();
                        n.summary = inputShortDescription.value.toString();
                        n.content = inputContent.value.toString();
                        newModel.addNew(n);
                        newRenderer.removeNewsFromDom();
                        var news = newModel.getNews(0, newModel.getLength());
                        newRenderer.insertNewsInDOM(news);
                        event.stopImmediatePropagation();
                        if(!n.title){
                              inputTitle.style.color = "#8b1500";
                        }else{
                            inputTitle.style.color = "#aaaaaa";
                        }
                        if(!n.content){
                            inputContent.style.color = "#8b1500";
                        }else{
                            inputContent.style.color = "#aaaaaa";
                        }
                        if(!n.summary){
                            inputShortDescription.style.color = "#8b1500";
                        }else{
                            inputShortDescription.style.color = "#aaaaaa";
                        }
                        if(n.title && n.summary && n.content){
                            inputURL.value = "";
                            inputContent.value = "";
                            inputShortDescription.value = "";
                            inputTitle.value = "";
                            inputTitle.style.color = "#aaaaaa";
                            inputContent.style.color = "#aaaaaa";
                            inputShortDescription.style.color = "#aaaaaa";
						    removeModalHandler();
                        }
					});
            }
	    );
}