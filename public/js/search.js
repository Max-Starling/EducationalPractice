function showSearchResult(criterion, value) {
    newRenderer.removeNewsFromDom();
    var news = newModel.getNews(0, newModel.getLength(), {critetion: value});
    newRenderer.insertNewsInDOM(news);
}

const searchBlock = document.querySelector('.search-block');
let criterionSearchArray = [];

const searchByTitle = searchBlock.querySelectorAll('.check')[0];
criterionSearchArray.push({checkbox: searchByTitle, criterion: "title"});

const searchByAuthor = searchBlock.querySelectorAll('.check')[1];
criterionSearchArray.push({checkbox: searchByAuthor, criterion: "author"});

const searchByDate = searchBlock.querySelectorAll('.check')[2];
criterionSearchArray.push({checkbox: searchByDate, criterion: "date"});

criterionSearchArray.forEach(
    function(searchByCriterion){ 
        searchByCriterion.checkbox.addEventListener('click', 
            function(){
                console.log(searchByCriterion.checkbox);
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
                    console.log(searchByCriterion.criterion);
                    search(searchByCriterion.checkbox, searchByCriterion.criterion);
                }else{
                    searchByCriterion.checkbox.value = "off";
                }
            }
        );
    }
);

function search(searchByCriterion, criterionSearch){
    document.forms.searchform.onsubmit = function(event){
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
                occurrenceArray.forEach(
                    function(el){
                        console.log(el);
                        showSearchResult(el, criterionSearch);
                    }
                );
            }else{
                newRenderer.removeNewsFromDom();
                newRenderer.insertNewsInDOM();
            }
        }
        searchIn.value = "";
    }; 
} 