function sort(sortByCriterion, criterion){
    sortByCriterion.addEventListener('click', 
        function(){
            if(sortByCriterion.value == "off"){
                sortByCriterion.value = "on";
                criterionArray.forEach(
                    function(item, i, criterionArray){
                        if(item !== sortByCriterion){
                            item.checked = false;
                            item.value = "off";
                        }
                    }
                );
                newRenderer.removeNewsFromDom();
                const news = newModel.getNews();
                newModel.sortNews(news, criterion);
                newRenderer.insertNewsInDOM(news);
            }else{
                sortByCriterion.value = "off";
                newRenderer.removeNewsFromDom();
                newRenderer.insertNewsInDOM(newModel.getNews());
            }
        }
    );
}
const criterionArray = [];
const sortBlock = document.querySelector('.sort-block');

const sortByTitle = sortBlock.querySelectorAll('.check')[0];
criterionArray.push(sortByTitle);
sort(sortByTitle, "title");

const sortByAuthor = sortBlock.querySelectorAll('.check')[1];
sort(sortByAuthor, "author");
criterionArray.push(sortByAuthor);

const sortByTextsize = sortBlock.querySelectorAll('.check')[2];
sort(sortByTextsize, "textsize");
criterionArray.push(sortByTextsize);