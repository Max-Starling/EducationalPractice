function startSearch(v){
     newRenderer.init();
     searchResultNews(v);
}

function searchResultNews(v) {
    newRenderer.removeNewsFromDom();
    var news = newModel.getNews(0, newModel.getLength(), {author: v});
    newRenderer.insertNewsInDOM(news);
}

document.forms.searchform.onsubmit = function(event){
            event.preventDefault();
            var searchIn = document.forms.searchform.searchin;
            var authorsArray = newModel.getAuthors();
            var news;
            if(!searchIn.value){
                newRenderer.removeNewsFromDom();
                news = newModel.getNews();
                newRenderer.insertNewsInDOM(news);
            }else{
                let firstOccurrence;
                let success = false;
                authorsArray.some(
                    function(element){
                        if(element.toString().toLowerCase().indexOf(searchIn.value.toString().toLowerCase()) + 1){
                            firstOccurrence = element;
                            success = true;
                        }
                    }
                )
                if(success){
                    startSearch(firstOccurrence.toString());
                }else{
                    newRenderer.removeNewsFromDom();
                    newRenderer.insertNewsInDOM();
                }
            }
    searchIn.value = "";
};  