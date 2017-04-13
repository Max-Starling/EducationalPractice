function newDetailShow(){
            const overlay = document.querySelector('.modal-overlay');
            
            const modalContent = document.querySelector('.modal-content');
            const modalText = modalContent.querySelector('.modal-text');
            //alert(modalText.textContent);
            const target = event.currentTarget;

            const ID = event.currentTarget.dataset.ID;
            console.log(ID);
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
            
            const modal = document.querySelector('#' + target.getAttribute('data-modal'));

            const edit = modal.querySelector('.modal-trigger2');
            edit.addEventListener('click', editNew(modal, 'modal-show', ID, t, sd, c));
            
            
            const close = modal.querySelector('.modal-trigger7');
            //close.removeEventListener('click', removeModalHandler);
            close.addEventListener('click', notice("Are you sure want to delete this?", modal, 'modal-show', ID));
            function removeModalHandler(){
					classie.remove(modal,'modal-show');
			}
			target.addEventListener('click', 
				function(event){
					classie.add(modal, 'modal-show');
					overlay.removeEventListener('click', removeModalHandler);
					overlay.addEventListener('click', removeModalHandler);
                    event.stopImmediatePropagation();
				}
		    );
            /*document.querySelectorAll('.modal-trigger').forEach(		
			function(){
				const modal = document.querySelector('#' + target.getAttribute('data-modal'));
				function removeModalHandler(){
					classie.remove(modal,'modal-show');
				}
				target.addEventListener('click', 
					function(event){
						classie.add(modal, 'modal-show');
						overlay.removeEventListener('click', removeModalHandler);
						overlay.addEventListener('click', removeModalHandler);
                        event.stopImmediatePropagation();
					}
		        );
                */
               // const close = modal.querySelector('.modal-trigger7');
                //close.addEventListener('click', notice("Are you sure want to delete this?", modal, 'modal-show', ID));
			} 
		//);
    //}
    /*close.addEventListener('click', 
                    function(ev){
                        newRenderer.removeNewsFromDom();
                        newModel.removeNew(ID.toString());
                        const news = newModel.getNews(0, newModel.getLength());
                        newRenderer.insertNewsInDOM(news);
                        event.stopImmediatePropagation();
                        removeModalHandler();
                    }
                );*/
                //const noticeButton = modal.querySelector('.modal-trigger7');
                //console.log(ID.toString());