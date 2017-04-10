function newDetailShow(){
            const overlay = document.querySelector('.modal-overlay');
            
            const modalContent = document.querySelector('.modal-content');
            const modalText = modalContent.querySelector('.modal-text');
            //alert(modalText.textContent);
            const target = event.currentTarget;

            const ID = event.currentTarget.dataset.ID;

            author = modalText.querySelector('.author');
            const a = target.querySelector('.author').textContent;
            author.textContent = a;

            content = modalText.querySelector('.content');
            const c = target.querySelector('.content').textContent;
            content.textContent = c;

            date = modalText.querySelector('.date');
            const d = target.querySelector('.date').textContent;
            date.textContent = d;

            title = modalText.querySelector('.title');
            const t = target.querySelector('.title').textContent;
            title.textContent = t;

            const sd = target.querySelector(".description").textContent;
            
            
            [].slice.call(document.querySelectorAll('.modal-trigger')).forEach(		
			function(el, i){
				const modal = document.querySelector('#' + el.getAttribute('data-modal'));
				function removeModalHandler(){
					classie.remove(modal,'modal-show');
				}
				el.addEventListener('click', 
					function(ev){
						classie.add(modal, 'modal-show');
						overlay.removeEventListener('click', removeModalHandler);
						overlay.addEventListener('click', removeModalHandler);
                        ev.stopImmediatePropagation();
					}
		        );
                
                const edit = modal.querySelector('.modal-trigger2');
                edit.addEventListener('click', editNew(ID, t, sd, c));
                /*console.log(state);
                if(state){
                        alert(state);
                        ev.stopPropagation();
                        if(editedNew.title){
                            alert("re");
                        }
                        content.textContent = c;
                        //newRenderer.removeNewsFromDom();
                        //newModel.removeNew(ID.toString());
                        //const news = newModel.getNews(0, newModel.getLength());
                        //newRenderer.insertNewsInDOM(news);
                        removeModalHandler();
                }*/
                        //event.stopImmediatePropagation();
                        //removeModalHandler();
                //);
                const close = modal.querySelector('.modal-close');
				close.addEventListener('click', 
                    function(ev){
                        //ev.stopPropagation();
                        newRenderer.removeNewsFromDom();
                        newModel.removeNew(ID.toString());
                        const news = newModel.getNews(0, newModel.getLength());
                        newRenderer.insertNewsInDOM(news);
                        event.stopImmediatePropagation();
                        removeModalHandler();
                    }
                );
			} 
		);
    }