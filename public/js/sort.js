function sort(sortByCriterion, criterion){
    sortByCriterion.addEventListener('click', 
        function(){
            if(sortByCriterion.value == "off"){
                sortByCriterion.value = "on";
                //console.log(sortByCriterion.value);
                criterionArray.forEach(
                    function(item, i, criterionArray){
                        if(item !== sortByCriterion){
                            item.disabled = true;
                        }
                    }
                );
                newRenderer.removeNewsFromDom();
                const news = newModel.getNews(0, newModel.getLength());
                newModel.sortNews(news, criterion);
                newRenderer.insertNewsInDOM(news);
            }else{
                sortByCriterion.value = "off";
                //console.log(sortByCriterion.value);
                criterionArray.forEach(
                    function(item, i, criterionArray){
                        if(item !== sortByCriterion){
                            item.disabled = false;
                        }
                    }
                );
                newRenderer.removeNewsFromDom();
                const news = newModel.getNews(0, newModel.getLength());
                newModel.sortNews(news, "");
                newRenderer.insertNewsInDOM(news);
            }
        }
    );
}
const criterionArray = [];

const sortByTitle = document.querySelectorAll('.check')[0];
criterionArray.push(sortByTitle);
sort(sortByTitle, "title");

const sortByAuthor = document.querySelectorAll('.check')[1];
sort(sortByAuthor, "author");
criterionArray.push(sortByAuthor);

const sortByTextsize = document.querySelectorAll('.check')[2];
sort(sortByTextsize, "textsize");
criterionArray.push(sortByTextsize);