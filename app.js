const express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var diskDB = require('diskdb');
diskDB.connect('private', ['news', 'users']);

// For getting users //
app.get('/users', (req, res) => {
  res.json(diskDB.users.find());
});

// For getting news //
app.get('/news', (req, res) => {
  res.json(diskDB.news.find());
});

// For getting new //
app.get('/news/:ID', (req, res) => {
  res.json(diskDB.news.findOne({ ID: req.params.ID }));
});

// For adding news //
app.post('/postNew', (req, res) => {
  res.json(diskDB.news.save(req.body));
});

// For deleting news //
app.delete('/news/:ID', (req, res) => {
  res.json(diskDB.news.remove({ ID: req.params.ID }));
});

// For editing news //
app.put('/news', (req, res) => {
  res.json(diskDB.news.update({ ID: req.body.ID }, req.body));
});

const port = '7777';
app.listen(port, () => {
  console.log(`STARLING NEWS listening on port ${port}!`);
  console.log(`Link:"http://localhost:${port}"`);
});
