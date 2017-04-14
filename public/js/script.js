var newModel = (function () {
    var news = [
        {
			ID: '0001',
			title: 'CHAPTER I',
			summary: 'Down the Rabbit-Hole',
			createdAt: new Date('2017-01-05T00:00:00'),
			author: 'Lewis Carroll',
			content: 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: ' +
			'once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, ' +
			'and what is the use of a book, thought Alice without pictures or conversation?',
			img: "images/pics/picture1.jpg"
        },
        {
            ID: '0002',
            title: 'CHAPTER II',
            summary: 'The Pool of Tears',
            createdAt: new Date("2017-01-10T01:01:01"),
            author: 'Lewis Carroll',
            content: 'Curiouser and curiouser! cried Alice (she was so much surprised, that for the moment she quite forgot how ' +
            'to speak good English); now I am opening out like the largest telescope that ever was!',
			img: "images/pics/picture2.jpg"
        },
        {
            ID: '0003',
            title: 'CHAPTER III',
            summary: 'A Caucus-Race and a Long Tale',
            createdAt: new Date("2017-01-15T02:02:02"),
            author: 'Lewis Carroll',
            content: 'They were indeed a queer-looking party that assembled on the bank—the birds with draggled feathers, the ' +
            'animals with their fur clinging close to them, and all dripping wet, cross, and uncomfortable.',
			img: "images/pics/picture3.jpg"
        },
        {
            ID: '0004',
            title: 'CHAPTER IV',
            summary: 'The Rabbit Sends in a Little Bill',
            createdAt: new Date("2017-01-18T03:03:03"),
            author: 'Lewis Carroll',
            content: 'It was the White Rabbit, trotting slowly back again, and looking anxiously about as it went, as if it had ' +
            'lost something; and she heard it muttering to itself.',
			img: "images/pics/picture4.jpg"
        },
        {
            ID: '0005',
            title: 'CHAPTER V',
            summary: 'Advice from a Caterpillar',
            createdAt: new Date("2017-01-21T05:05:05"),
            author: 'Lewis Carroll',
            content: 'The Caterpillar and Alice looked at each other for some time in silence: at last the Caterpillar took the ' +
            'hookah out of its mouth, and addressed her in a languid, sleepy voice.',
			img: "images/pics/picture5.jpg"
        },
        {
            ID: '0006',
            title: 'CHAPTER VI',
            summary: 'Pig and Pepper',
            createdAt: new Date("2017-01-26T06:06:06"),
            author: 'Lewis Carroll',
            content: 'The Caterpillar and Alice looked at each other for some time in silence: at last the Caterpillar took the ' +
            'hookah out of its mouth, and addressed her in a languid, sleepy voice.For a minute or two she stood looking at the ' +
            'house, and wondering what to do next, when suddenly a footman in livery came running out of the wood—(she considered ' +
            'him to be a footman because he was in livery: otherwise, judging by his face only, she would have called him a fish)' +
            '—and rapped loudly at the door with his knuckles.',
			img: "images/pics/picture6.jpg"
        },
        {
            ID: '0007',
            title: 'CHAPTER VII',
            summary: 'A Mad Tea-Party',
            createdAt: new Date("2017-01-31T07:07:07"),
            author: 'Lewis Carroll',
            content: 'There was a table set out under a tree in front of the house, and the March Hare and the Hatter were having ' +
            'tea at it: a Dormouse was sitting between them, fast asleep, and the other two were using it as a cushion, resting their ' +
            'elbows on it, and talking over its head.',
			img: "images/pics/picture7.jpg"
        },
        {
            ID: '0008',
            title: 'CHAPTER VIII',
            summary: 'The Queens Croquet-Ground',
            createdAt: new Date("2017-02-02T08:08:08"),
            author: 'Lewis Carroll',
            content: 'A large rose-tree stood near the entrance of the garden: the roses growing on it were white, but there were ' +
            'three gardeners at it, busily painting them red.',
			img: "images/pics/picture8.jpg"
        },
        {
            ID: '0009',
            title: 'CHAPTER IX',
            summary: 'The Mock Turtles Story',
            createdAt: new Date("2017-02-07T09:09:09"),
            author: 'Lewis Carroll',
            content: 'You cant think how glad I am to see you again, you dear old thing! said the Duchess, as she tucked her arm ' +
            'affectionately into Alices, and they walked off together.',
			img: "images/pics/picture9.jpg"
        },
        {
            ID: '0010',
            title: 'CHAPTER X',
            summary: 'The Lobster Quadrille',
            createdAt: new Date("2017-02-14T10:10:10"),
            author: 'Lewis Carroll',
            content: 'The Mock Turtle sighed deeply, and drew the back of one flapper across his eyes. He looked at Alice, and tried ' +
            'to speak, but for a minute or two sobs choked his voice.',
			img: "images/pics/picture10.jpg"
        },
        {
            ID: '0011',
            title: 'CHAPTER XI',
            summary: 'Who Stole the Tarts?',
            createdAt: new Date("2017-02-17T11:11:11"),
            author: 'Lewis Carroll',
            content: 'The King and Queen of Hearts were seated on their throne when they arrived, with a great crowd assembled about ' +
            'them—all sorts of little birds and beasts, as well as the whole pack of cards: the Knave was standing before them, in ' +
            'chains, with a soldier on each side to guard him; and near the King was the White Rabbit, with a trumpet in one hand, ' +
            'and a scroll of parchment in the other.The King and Queen of Hearts were seated on their throne when they arrived, with a great crowd assembled about ' +
            'them—all sorts of little birds and beasts, as well as the whole pack of cards: the Knave was standing before them, in ' +
            'chains, with a soldier on each side to guard him; and near the King was the White Rabbit, with a trumpet in one hand, ' +
            'and a scroll of parchment in the other.The King and Queen of Hearts were seated on their throne when they arrived, with a great crowd assembled about ' +
            'them—all sorts of little birds and beasts, as well as the whole pack of cards: the Knave was standing before them, in ' +
            'chains, with a soldier on each side to guard him; and near the King was the White Rabbit, with a trumpet in one hand, ' +
            'and a scroll of parchment in the other.',
			img: "images/pics/picture11.jpg"
        },
        {
            ID: '0012',
            title: 'CHAPTER XII',
            summary: 'Alices Evidence',
            createdAt: new Date("2017-02-18T12:12:12"),
            author: 'Lewis Carroll',
            content: 'Here! cried Alice, quite forgetting in the flurry of the moment how large she had grown in the last few minutes, ' +
            'and she jumped up in such a hurry that she tipped over the jury-box with the edge of her skirt, upsetting all the jurymen ' +
            'on to the heads of the crowd below, and there they lay sprawling about, reminding her very much of a globe of goldfish ' +
            'she had accidentally upset the week before.',
			img: "images/pics/picture12.jpg"
        },
        {
            ID: '0013',
            title: 'I',
            summary: 'Once',
            createdAt: new Date("2016-02-22T13:13:13"),
            author: 'Antoine Exupery',
            content: 'Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about ' +
            'the primeval forest. ',
			img: "images/pics/picture13.jpg"
        },
        {
            ID: '0014',
            title: 'II',
            summary: 'So',
            createdAt: new Date("2016-02-27T14:14:14"),
            author: 'Antoine Exupery',
            content: 'So I lived my life alone, without anyone that I could really talk to, until I had an accident with my plane ' +
            'in the Desert of Sahara, six years ago.  ',
			img: "images/pics/picture14.jpg"
        },
        {
            ID: '0015',
            title: 'III',
            summary: 'It',
            createdAt: new Date("2016-03-05T15:15:15"),
            author: 'Antoine Exupery',
            content: 'It took me a long time to learn where he came from. The little prince, who asked me so many questions, never ' +
            'seemed to hear the ones I asked him. ',
			img: "images/pics/picture15.jpg"
        },
        {
            ID: '0016',
            title: 'IV',
            summary: 'I',
            createdAt: new Date("2016-03-07T16:16:16"),
            author: 'Antoine Exupery',
            content: 'I had thus learned a second fact of great importance: this was that the planet the little prince came from ' +
            'was scarcely any larger than a house!',
			img: "images/pics/picture16.jpg"
        },
        {
            ID: '0017',
            title: 'V',
            summary: 'As',
            createdAt: new Date("2016-03-09T17:17:17"),
            author: 'Antoine Exupery',
            content: 'As each day passed I would learn, in our talk, something about the little princes planet, his departure from ' +
            'it, his journey. ',
			img: "images/pics/picture17.jpg"
        },
        {
            ID: '0018',
            title: 'VI',
            summary: 'Oh',
            createdAt: new Date("2016-03-16T18:18:18"),
            author: 'Antoine Exupery',
            content: 'Oh, little prince! Bit by bit I came to understand the secrets of your sad little life...',
			img: "images/pics/picture18.jpg"
        },
        {
            ID: '0019',
            title: 'VII',
            summary: 'Always',
            createdAt: new Date("2016-03-24T19:19:19"),
            author: 'Antoine Exupery',
            content: 'On the fifth day—again, as always, it was thanks to the sheep—the secret of the little princes life was ' +
            'revealed to me.',
			img: "images/pics/picture19.jpg"
        },
        {
            ID: '0020',
            title: 'VIII',
            summary: 'Soon',
            createdAt: new Date("2016-03-31T20:20:20"),
            author: 'Antoine Exupery',
            content: 'I soon learned to know this flower better. On the little princes planet the flowers had always been very simple. ' +
            'They had only one ring of petals; they took up no room at all; they were a trouble to nobody. ',
			img: "images/pics/picture20.jpg"
        }
        ];
    function validateNew(n) {
        /*ID*/
        if (!n.ID) {
            console.log("Oops. Something is wrong. You should try again later.(ID)"); /*Also u can report yo us.*/
            return false;
        }
        /*Title*/
        if (!n.title){
            console.log("Oops. Empty field. You should check field 'title' and try again.");
            return false;
        }else{
            if ((n.title.length >= 100) || n.title.length == 0){
                console.log("Oops. Length limit is broken. You should check field 'title' and try again.");
                return false;
            }
        }
        /*Summary*/
        if(!n.summary){
            return false;
        }else if(n.summary.length >= 300 ||  n.summary.length == 0){
            console.log("Oops. Length limit is broken. You should check field 'summary' and try again.");
            return false;
        }
        /*Date*/
        if (!n.createdAt)
        {
            console.log("Oops. Something is wrong. You should try again later.(createdAt)");
            return false;
        }
        /*Author*/
        if(!n.author) {
            console.log("Oops. Something is wrong. You should try again later.(author)");
            return false;
        }else if (n.author.length == 0){
            console.log("Oops. Something is wrong. You should check it and try again.(author.length)");
            return false;
        }
        /*Content*/
        if(!n.content){
            console.log("Oops. Something is wrong with content. You should check it and try again.");
            return false;
        }else if (n.content.length == 0){
            console.log("Oops. Something is wrong with content length. You should check it and try again.");
            return false;
        }
        return true;
    }
    /*var storage = JSON.parse(localStorage.getItem('data'));
    if(!storage){
        localStorage.setItem('data', JSON.stringify(news));
    }else{
        news = storage;
        for (var i of news){
            i.createdAt = new Date(i.createdAt);
        }
    }

    window.addEventListener('beforeunload', 
        function (){
            localStorage.setItem('data', JSON.stringify(news));
        }
    );
*/
    function getLength(){
        return news.length;
    }
    function getNew(ID) {
        for (i = 0; i < news.length; i++){
            if (news[i].ID == ID){
                return news[i];
            }
        }
    }
    function sortNews(news, criterion){
        news.sort(
            function (x, y){
                if (x.createdAt < y.createdAt){
                    return 1;
                }else if (x.createdAt > y.createdAt){
                    return -1;
                }
            }
        );
        if(criterion == "title"){
            news.sort(
                function (x, y){
                    if (x.title > y.title){
                        return 1;
                    }else if (x.title < y.title){
                        return -1;
                    }
                }
            );
        }
        if(criterion == "author"){
            news.sort(
                function (x, y){
                    if (x.author > y.author){
                        return 1;
                    }else if (x.author < y.author){
                        return -1;
                    }
                }
            );
        }
        if(criterion == "textsize"){
            news.sort(
                function (x, y){
                    if (x.content.length < y.content.length){
                        return 1;
                    }else if (x.content.length > y.content.length){
                        return -1;
                    }
                }
            );
        }
    }
    function searchNews(inputValue, news, criterion){
        let occurrenceArray = [];
        
        function unique(arr) {
            var obj = {};

            for (var i = 0; i < arr.length; i++) {
                var str = arr[i];
                obj[str] = true; // запомнить строку в виде свойства объекта
            }

            return Object.keys(obj); 
        }
    
        if(criterion == "title"){
            console.log(criterion + " " + inputValue);
            let occurrenceArray = [];
            news.map(x => x.title).some(
                function(element){
                    if(element.toString().toLowerCase().indexOf(inputValue.toString().toLowerCase()) >= 0){
                        console.log(element);
                        occurrenceArray.push(element);
                    }
                }
            );
            occurrenceArray = unique(occurrenceArray);
            return occurrenceArray;
        }
        if(criterion == "author"){
            news.map(x => x.author).some(
                function(element){
                    if(element.toString().toLowerCase().indexOf(inputValue.toString().toLowerCase()) >= 0){
                        occurrenceArray.push(element);
                    }
                }
            );
            occurrenceArray = unique(occurrenceArray);
            return occurrenceArray;
        }
        if(criterion == "date" || !criterion){
            //console.log("qqq");
            /*news.map(x => x.createdAt).some(
                function(element){
                    console.log(element.toString().toLowerCase());
                    if(element.toString().toLowerCase().indexOf(inputValue.toString().toLowerCase()) >= 0){
                        occurrenceArray.push(element);
                    }
                }
            );*/
            //occurrenceArray = unique(occurrenceArray);
            occurrenceArray.push(inputValue);
            return occurrenceArray;
        }
    }
    function getAuthors(){
        return news.map(x => x.author);
    }
    function getNews(skip, top, criterion, value) {       
        /*Default*/
        if (!skip){
            skip = 0;
        }
        if (!top){
            top = news.length;
        }
        var out = news.slice();
        sortNews(out);
        if (criterion && value){
             //console.log(criterion);
            //  Title  //
            if (criterion === "title"){
                 out = out.filter(
                     function (n){
                         console.log(value, n.title);
                         return value === n.title;
                     }
                 );
            }
            //  Author  //
            if (criterion === "author"){
                //console.log(criterion);
                 out = out.filter(
                     function (n){
                         console.log(value, n.author);
                         return value === n.author;
                     }
                 );
            }
            //  Date  //
            if (criterion === "date"){
                //date = new Date(value);
                out = out.filter(
                    function (n){
                        console.log(value.toString().toLowerCase());
                        console.log(n.createdAt.toString().toLowerCase());
                        console.log("     ");
                        console.log(n.createdAt.toString().toLowerCase().indexOf(value.toString().toLowerCase()));
                        //if(value){
                        return n.createdAt.toString().toLowerCase().indexOf(value.toString().toLowerCase()) >= 0;
                        //}
                    }
                );
             }
            //sortNews(out, criterion);
        }
        return out.slice(skip, skip + top);
    }
    function addNew(n){
        if (validateNew(n)){
            news.push(n);
            return true;
        } else{
            return false;
        }
    }
    function removeNew(ID){
        var tmp = 0;
        console.log("ID " + ID);
        for(var i = 0; i < news.length; i++){
            if(news[i].ID === ID){
                tmp = i;
            }
        }
        news.splice(tmp, 1);
        //alert(news.length);
    }
    function editNew(ID, n) {
        for(var i = 0; i < news.length; i++){
            if(news[i].ID === ID){
                tmp = i;
            }
        }
        var i = tmp;
        if (news[i]){
            var tmp = news[i];
            if (n.title){
                news[i].title = n.title;
            }
            if (n.summary){
                news[i].summary = n.summary;
            }
            if (n.createdAt){
                news[i].createdAt = n.createdAt;
            }
            if (n.author){
                news[i].author = n.author;
            }
            if (n.content){
                news[i].content = n.content;
            }
            if (n.img){
                news[i].img = n.img;
            }
            if (!validateNew(news[i])){
                news[i] = tmp;
                return false;
            }else{
                return true;
            }
        }
        return false;
    }
    return {
        getNew: getNew,
        getNews: getNews,
        editNew: editNew,
        removeNew:removeNew,
        sortNews: sortNews,
        searchNews: searchNews,
        addNew: addNew,
        getAuthors: getAuthors,
        getLength: getLength
    };
}())
var userInfo = (function() {
    var username = document.getElementsByClassName("user-info-name")[0].textContent; 
    function getUserName(){
        //username 
        console.log(username + "");
        alert(username  + "");
    }
    function setUserName(usrnm){
         username=usrnm;
    }
    return {
        getUserName: getUserName,
        setUserName: setUserName,
        /*short*/
        getn: getUserName,
        setn: setUserName
    };
}());
var newRenderer =(
    function (){
        var ARTICLE_TEMPLATE;
        var ARTICLE_LIST_NODE;
        function init(){
            ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
            ARTICLE_LIST_NODE = document.querySelector('.article-list');
        }
        function insertNewsInDOM(news){
            if(!news){
                news = newModel.getNews();
            }
            var newsNodes = renderNews(news);
            newsNodes.forEach(
                function (node){
                    ARTICLE_LIST_NODE.appendChild(node);
                }
            );
        }
        function removeNewsFromDom (){
            ARTICLE_LIST_NODE.innerHTML = '';
        }
        function removeNewFromDom (){
            ARTICLE_LIST_NODE.removeChild(node);
        }
        function renderNews(news){
            return news.map(
                function (n){
                    return renderNew(n);
                }
            );
        }
    function renderNew(n){
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.ID = n.ID;
        template.content.querySelector('.article-list-item-title').textContent = n.title;
        template.content.querySelector('.article-list-item-summary').textContent = n.summary;
        template.content.querySelector('.article-list-item-author').textContent = n.author;
        template.content.querySelector('.article-list-item-content').textContent = n.content;
		template.content.querySelector('.article-list-item-img').src = n.img;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(n.createdAt);
        return template.content.querySelector('.article-list-item').cloneNode(true); 
    }
	function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
    function formatDate(d) {
		var month = "Jan";
		switch(d.getMonth()){
			case 0: month = "Jan"; break;
			case 1: month = "Feb"; break;
			case 2: month = "Mar"; break;
			case 3: month = "Apr"; break;
			case 4: month = "May"; break;
			case 5: month = "Jun"; break;
			case 6: month = "Jul"; break;
			case 7: month = "Aug"; break;
			case 8: month = "Sep"; break;
			case 9: month = "Oct"; break;
			case 10: month = "Nov"; break;
			case 11: month = "Dec"; break;
		}
		var m = addZero(d.getMinutes());
        return d.getHours() + ':' + m + ' ' + month + ', ' + d.getDate();
    }
    return {
        init: init,
        formatDate: formatDate,
        insertNewsInDOM: insertNewsInDOM,
        removeNewsFromDom: removeNewsFromDom
    };
}());

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    //userInfo.getUserName();
    newRenderer.init();
    renderNews();
}

function renderNews(skip, top) {
    newRenderer.removeNewsFromDom();
    var news = newModel.getNews(0, newModel.getLength(), {author: ""});
    newRenderer.insertNewsInDOM(news);
}
