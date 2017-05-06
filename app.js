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
  res.status(200);
});

// For getting news //
app.get('/news', (req, res) => {
  res.json(diskDB.news.find());
  res.status(200);
});

// For getting new //
app.get('/news/:ID', (req, res) => {
  res.json(diskDB.news.findOne({ ID: req.params.ID }));
  res.status(200);
});

// For adding news //
app.post('/postNew', (req, res) => {
  res.json(diskDB.news.save(req.body));
  res.status(200);
});

// For deleting news //
app.delete('/news/:ID', (req, res) => {
  res.json(diskDB.news.remove({ ID: req.params.ID }));
  res.status(200);
});

// For editing news //
app.put('/news/:ID', (req, res) => {
  res.json(diskDB.news.update({ ID: req.params.ID }, req.body));
  res.status(200);
});

const port = '7777';
app.listen(port, () => {
  console.log(`STARLING NEWS listening on port ${port}!`);
  console.log(`Link:"http://localhost:${port}"`);
});
