var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var diskDB = require('diskdb');
diskDB.connect('private', ['news', 'users']);

// For getting users //
app.get('/users', 
    function (req, res) {
        res.json(diskDB.users.find()); 
    }
);

// For getting news //
app.get('/news', 
    function (req, res) {
        res.json(diskDB.news.find());
    }
);

// For getting new //
app.get('/news/:ID',
    function (req, res) {
        res.json(diskDB.news.findOne({ID: req.params.ID}));
    }
);

// For adding news //
app.post('/postNew', 
    function (req, res) {
        res.json(diskDB.news.save(req.body));
    }
);

// For deleting news //
app.delete('/news/:ID', 
    function (req, res) {
        res.json(diskDB.news.remove({ ID: req.params.ID }));
    }
);

// For editing news //
app.put('/news', 
    function (req, res) {
        res.json(diskDB.news.update({ ID: req.body.ID }, req.body));
    }
);

const port = '7777';
app.listen(port, 
    function () {
        console.log('STARLING NEWS listening on port '  + port + '!');
        console.log('Link:"http://localhost:' + port + '"');
    }
);