var express = require('express');
var app = express();


app.use(express.static('public'));
app.listen(7777, 
    function () {
        console.log('STARLING NEWS listening on port 7777! Link:"http://localhost:7777"');
    }
);