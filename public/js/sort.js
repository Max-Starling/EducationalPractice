const sortByTitle = document.querySelectorAll('.check')[0];
//console.log(sort);
//console.log(sort.value);
let filterConfig;
sortByTitle.addEventListener('click', 
    function(){
        if(sortByTitle.value == "off"){
            sortByTitle.value = "on";
            console.log(sortByTitle.value);
            filterConfig = "title";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            newRenderer.insertNewsInDOM(news);
        }else{
            sortByTitle.value = "off";
            console.log(sortByTitle.value);
            filterConfig = "";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            //news = newModel.getNews(0, newModel.getLength(), "author");
            newRenderer.insertNewsInDOM(news);
        }
    }
);
const sortByAuthor = document.querySelectorAll('.check')[1];
sortByAuthor.addEventListener('click', 
    function(){
        if(sortByAuthor.value == "off"){
            sortByAuthor.value = "on";
            console.log(sortByAuthor.value);
            filterConfig = "author";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            newRenderer.insertNewsInDOM(news);
        }else{
            sortByAuthor.value = "off";
            console.log(sortByAuthor.value);
            filterConfig = "";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            newRenderer.insertNewsInDOM(news);
        }
    }
);
const sortByTextsize = document.querySelectorAll('.check')[2];
sortByTextsize.addEventListener('click', 
    function(){
        if(sortByTextsize.value == "off"){
            sortByTextsize.value = "on";
            console.log(sortByTextsize.value);
            filterConfig = "textsize";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            newRenderer.insertNewsInDOM(news);
        }else{
            sortByTextsize.value = "off";
            console.log(sortByTextsize.value);
            filterConfig = "";
            newRenderer.removeNewsFromDom();
            var news = newModel.getNews(0, newModel.getLength(), filterConfig);
            newRenderer.insertNewsInDOM(news);
        }
    }
);
