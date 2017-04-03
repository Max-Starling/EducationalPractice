function newDetailShow(){
		    var overlay = document.querySelector('.modal-overlay');
            var modalText = document.getElementsByClassName("modal-text")[0];
            title = modalText.getElementsByClassName("title")[0];
            content = modalText.getElementsByClassName("content")[0];
            author = modalText.getElementsByClassName("author")[0];
            date = modalText.getElementsByClassName("date")[0];
            ID = event.currentTarget.dataset.ID;       
            var t = event.currentTarget.getElementsByClassName("title")[0].textContent;
            var c = event.currentTarget.getElementsByClassName("content")[0].textContent;
            var a = event.currentTarget.getElementsByClassName("author")[0].textContent;
            var d = event.currentTarget.getElementsByClassName("date")[0].textContent;
            title.textContent = t;
            content.textContent = c;
            date.textContent = d;
            author.textContent = a;      
         [].slice.call(document.querySelectorAll('.modal-trigger')).forEach( 				
			function(el, i){
				var modal = document.querySelector('#' + el.getAttribute('data-modal'));
				function removeModalHandler(){
					classie.remove(modal,'modal-show');
				}
				el.addEventListener('click', 
					function(ev){
						classie.add(modal, 'modal-show');
						overlay.removeEventListener('click', removeModalHandler);
						overlay.addEventListener('click', removeModalHandler);
					}
		        );
                var close = modal.querySelector('.modal-close');
					close.addEventListener('click', function(ev){
						ev.stopPropagation();
                        newRenderer.removeNewsFromDom();
                        newModel.removeNew(ID.toString());
                        var news = newModel.getNews(0, newModel.getLength());
                        newRenderer.insertNewsInDOM(news);
                        event.stopImmediatePropagation();
						removeModalHandler();
				    });
			} 
		);
    }