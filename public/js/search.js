var searchForm = document.getElementById("searchform");
searchForm.onsubmit = function(event){
            event.preventDefault();
            var searchIn = document.forms.searchform.searchin;
            var authors = newModel.getAuthors();
            var news;
            if(searchIn.value === ""){
                newRenderer.removeNewsFromDom();
                news = newModel.getNews();
                newRenderer.insertNewsInDOM(news);
            }else{
                var i;
                for(i = 0; i < authors.length; i++){
                    if(authors[i].toString().toLowerCase().indexOf(searchIn.value.toString().toLowerCase()) + 1){
                        startSearch(authors[i]);
                        break;
                    }
                }
                if(i === authors.length){
                    newRenderer.removeNewsFromDom();
                    news = newModel.getNews();
                    newRenderer.insertNewsInDOM(news);
                }
            }
    searchIn.value = "";
};  