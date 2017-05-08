const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const diskDB = require('diskdb');
diskDB.connect('private', ['news', 'users', 'users_mention']);

// For getting users //
app.get('/users', (req, res) => {
  res.json(diskDB.users.find());
  res.status(200);
});

// For cheking user //
app.get('/checkUser/:user/:password', (req, res) => {
  console.log(req.params);
  if (!req.params.user || !req.params.password) {
    res.status(200);
    res.json(false);
  } else {
    res.status(200);
    if (
      diskDB.users.findOne({
        user: req.params.user,
        password: req.params.password,
      })
    ) {
      res.json(
        diskDB.users.findOne({
          user: req.params.user,
          password: req.params.password,
        }));
    } else {
      res.json(false);
    }
  }
});

app.get('/checkUser/:user', (req, res) => {
  console.log(req.params);
  if (!req.params.user) {
    res.status(200);
    res.json(false);
  } else {
    res.status(200);
    if (diskDB.users.findOne({ user: req.params.user })) {
      res.json(diskDB.users.findOne({ user: req.params.user }));
    } else {
      res.json(false);
    }
  }
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

// For registring new user //
app.post('/register', (req, res) => {
  res.json(diskDB.users.save(req.body));
  res.status(200);
});

// For posting mention //
app.post('/postMention', (req, res) => {
  res.json(diskDB.users_mention.save(req.body));
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
