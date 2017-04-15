function showSearchResult(criterion, value) {
    var news = newModel.getNews(0, newModel.getLength(), criterion, value);
    newRenderer.insertNewsInDOM(news);
}

const searchBlock = document.querySelector('.search-block');
let criterionSearchArray = [];

criterionSearchArray.push(
    {checkbox: searchBlock.querySelectorAll('.check')[0], 
    criterion: "title"}
);

criterionSearchArray.push(
    {checkbox: searchBlock.querySelectorAll('.check')[1], 
    criterion: "author"}
);

criterionSearchArray.push(
    {checkbox: searchBlock.querySelectorAll('.check')[2], 
    criterion: "date"}
);

startSearch();
function startSearch(){
    criterionSearchArray.forEach(
        function(searchByCriterion){ 
            let state = false;
            searchByCriterion.checkbox.addEventListener('click', 
                function(){
                    document.forms.searchform.searchin.placeholder = "search";
                    if(searchByCriterion.checkbox.value == "off"){
                        searchByCriterion.checkbox.value = "on";
                        criterionSearchArray.forEach(
                            function(item, i, criterionSearchArray){
                                if(item.checkbox !== searchByCriterion.checkbox){
                                    item.checkbox.checked = false;
                                    item.checkbox.value = "off";
                                }
                            }
                        );
                        state = true;
                        search(state, searchByCriterion.checkbox, searchByCriterion.criterion);
                    }else{
                        state = false;
                        search(state);
                        searchByCriterion.checkbox.value = "off";
                    }
                }
            );
            search(state);
        }
    );

    //modalModule.notice("qq", "","","");
    function search(state, searchByCriterion, criterionSearch){
        console.log(state);
        let form = document.forms.searchform;
        if(!state){
            form.onsubmit = function(event){
                event.preventDefault();
                //console.log("qq");
                form.searchin.value = "";
                form.searchin.placeholder = "please select a criterion";
                //return;
                //modalModule.notice("qq");
            }
        }else{
            form.onsubmit = function(event){
                event.preventDefault();
                var searchIn = document.forms.searchform.searchin;
                //var authorsArray = newModel.getAuthors();
                var news;
                if(!searchIn.value){
                    newRenderer.removeNewsFromDom();
                    newRenderer.insertNewsInDOM(newModel.getNews());
                }else{
                    let occurrenceArray;
                    if(criterionSearch){
                        console.log(searchByCriterion, criterionSearch);
                        occurrenceArray = newModel.searchNews(searchIn.value, newModel.getNews(), criterionSearch);
                        console.log(occurrenceArray);
                        newRenderer.removeNewsFromDom();
                        occurrenceArray.forEach(
                            function(el){
                                console.log(criterionSearch, el);
                                showSearchResult(criterionSearch, el);
                            }
                        );
                    }else{
                        newRenderer.removeNewsFromDom();
                        newRenderer.insertNewsInDOM();
                    }
                }
                searchIn.value = "";
                //return;
            };
        } 
    } 
};