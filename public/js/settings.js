function settings(){
		const overlay = document.querySelector('.modal-overlay');
        const modalContent = document.getElementsByClassName("modal-content5")[0]; 
        document.getElementsByClassName("modal-title")[4].textContent = "SETTINGS";
        //  Form  //
        const form = document.getElementsByClassName("settings-form")[0];
        form.spellcheck = false;
        form.onsubmit = function(event){
            event.preventDefault(); 
        };

        const slider = document.getElementsByClassName("slider")[0];
        //alert(slider.value);
        [].slice.call(document.querySelectorAll('.modal-trigger6')).forEach(		
            function(el, i){
                const modal = document.querySelector('#' + el.getAttribute('data-modal'));
                    function removeModalHandler(){
                        classie.remove(modal,'modal-show5');
                    }
                    el.addEventListener('click', 
                        function(){
                            classie.add(modal, 'modal-show5');
                            overlay.removeEventListener('click', removeModalHandler);
                            overlay.addEventListener('click', removeModalHandler);
                        }
 		            );
                    const close = modal.querySelector('.md-close');
					close.addEventListener('click', function(ev){
                        //  Saturation effect from 0.5 to 1.5 with slider  //
                        let value = (slider.value / 100) + 0.5;
                        const wrapper = document.getElementsByClassName("wrapper")[0];
                        wrapper.style.filter = "saturate(" + value + ")";
						ev.stopPropagation();
                        removeModalHandler();
				});
            }
	    );
}