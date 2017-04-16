function settings(){
	const overlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content5'); 
    modalContent.querySelector('.modal-title').textContent = "SETTINGS";
    //  Form  //
    const form = document.querySelector('.settings-form');
    form.spellcheck = false;
    form.onsubmit = function(event){
        event.preventDefault(); 
    };

    const slider = document.querySelector('.slider');
    var el = document.querySelector('.modal-trigger6');  
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
	close.addEventListener('click', 
        function(event){
            //  Saturation effect from 0.5 to 1.5 with slider  //
            let value = (slider.value / 100) + 0.5;
            const wrapper = document.getElementsByClassName("wrapper")[0];
            wrapper.style.filter = "saturate(" + value + ")";
            event.stopPropagation();
            removeModalHandler();
        }
    );      
}