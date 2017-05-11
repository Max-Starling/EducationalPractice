
//  ========== DEPENDENCIES ==========  //

const bodyParser = require('body-parser');
const express = require('express');
const diskDB = require('diskdb');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const SessionFS = require('session-file-store')(session);

//  ========== CONFIGURATION ==========  //

const app = express();
//  app.configure(() => {
app.use(express.static('public'));
//  app.use(express.cookieParser());
//  app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'Stay alive',
    saveUninitialized: true,
    resave: false,
    store: new SessionFS(),
  }));
app.use(passport.initialize());
app.use(passport.session());
//  app.use(app.router);
//  });

diskDB.connect('private', ['news', 'mentions', 'users']);
const mongoDB = mongoose.createConnection('mongodb://localhost/StarlingNews');

//  ========== MONGO MODELS ==========  //

//  News model  //
const newsModel = new mongoose.Schema({
  title: String,
  summary: String,
  createdAt: Date,
  author: String,
  content: String,
  img: String,
});
// module.exports.news = mongoDB.model('news', newsModel);
// module.exports.newsBackup = mongoDB.model('newsBackup', newsModel);
const news = mongoDB.model('news', newsModel);

//  Users model  //
const usersModel = new mongoose.Schema({
  username: String,
  password: String,
  rank: String,
  img: String,
});
// module.exports.users = mongoDB.model('users', usersModel);
// module.exports.usersBackup = mongoDB.model('usersBackup', usersModel);
const users = mongoDB.model('users', usersModel);

//  Mentions model  //
const mentionsModel = new mongoose.Schema({
  username: String,
  mention: String,
});
// module.exports.mentions = mongoDB.model('mentions', mentionsModel);
// module.exports.mentionsBackup = mongoDB.model('mentionsBackup', mentionsModel);
const mentions = mongoDB.model('mentions', mentionsModel);

//  ========== MONGO FUNCTIONS ==========  //

mongoDB.on('error', error => console.log('Connection to database was failded, because: ', error.message));
mongoDB.once('open', () => {
  console.log('Successfully connected to database.');
  // news.insertMany(diskDB.news.find());
  // users.insertMany(diskDB.users.find());
  // mentions.insertMany(diskDB.mentions.find());
});

//  ========== FUNCTIONS ==========  //

//  For cheking user and password  //
app.get('/checkUser/:username/:password', (req, res) => {
  console.log(req.params);
  if (!req.params.user || !req.params.password) {
    res.status(200);
    res.json(false);
  } else {
    res.status(200);
    if (
      diskDB.users.findOne({
        user: req.params.user,
        password: req.params.password })
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

//  For cheking user  //
app.get('/checkUser/:username', (req, res) => {
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

//  For getting news  //
app.get('/news', (req, res) => {
  news.find((error, n) => (error ? res.sendStatus(500) : res.json(n)));
});

//  For getting new  //
app.get('/news/:ID', (req, res) => {
  // news.findById(req.params.ID, error => (error ? res.sendStatus(500) : res.json(this)));
});

//  For adding news  //
app.post('/postNew', (req, res) => {
  const n = {
    title: req.body.title,
    summary: req.body.summary,
    createdAt: req.body.createdAt,
    author: req.body.author,
    content: req.body.content,
    img: req.body.content,
  };
  news(n).save(error => (error ? res.sendStatus(500) : res.sendStatus(200)));
});

//  For registring new user  //
app.post('/register', (req, res) => {
  const u = {
    username: req.body.username,
    password: req.body.password,
    rank: req.body.rank,
    img: req.body.img,
  };
  users(u).save(error => (error ? res.sendStatus(500) : res.sendStatus(200)));
});

//  For posting mention  //
app.post('/postMention', (req, res) => {
  const m = {
    username: req.body.username,
    mention: req.body.mention,
  };
  mentions(m).save(error => (error ? res.sendStatus(500) : res.sendStatus(200)));
});

//  For deleting news  //
app.delete('/news/:ID', (req, res) => {
  news.findByIdAndRemove(req.params.ID,
                         error => (error ? res.sendStatus(500) : res.sendStatus(200)));
});

//  For editing news  //
app.put('/news/:ID', (req, res) => {
  const paramsSet = {};
  if (req.body.img) {
    paramsSet.img = req.body.img;
  }
  if (req.body.title) {
    paramsSet.title = req.body.title;
  }
  if (req.body.summary) {
    paramsSet.summary = req.body.summary;
  }
  if (req.body.content) {
    paramsSet.content = req.body.content;
  }
  news.findByIdAndUpdate(req.params.ID, { $set: paramsSet },
                         error => (error ? res.sendStatus(500) : res.sendStatus(200)));
});

//  For editing profile  //
app.put('/users/:username', (req, res) => {
  // res.json(diskDB.users.update({ user: req.params.user }, req.body));
  // res.status(200);
});

//  ========== PASSPORT ==========  //

//  Serialize user  //
passport.serializeUser((user, done) => done(null, user));

//  Deserialize user  //
passport.deserializeUser((user, done) => {
  const err = user ? null : new Error('deserialize');
  done(err, user);
});

//  Passport for authorization  //
passport.use(
  'logIn',
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log();
      console.log(`username: ${username}`);
      console.log(`password: ${password}`);
      console.log();
      users.findOne({ username }, (error, user) => {
        if (error) {
          return done(null, false, { message: error });
        } else if (!user) {
          console.log('We cant found this user in database.');
          return done(null, false, {
            message: 'We cant found this user in database.',
          });
        } else if (password !== user.password) {
          console.log('User was fount, but password is wrong.');
          return done(null, false, {
            message: 'User was fount, but password is wrong.',
          });
        }
        console.log('You was successfully authorized.');
        console.log('Data in database:');
        console.log(user);
        return done(null, user, { message: 'You was successfully authorized.' });
      });
    }));

//  For log in  //
app.post('/logIn', passport.authenticate('logIn'), (req, res) => res.send(req.user));

//  For log out  //
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});
//  ========== PORT ==========  //

const port = '7777';
app.listen(port, () => {
  console.log(`STARLING NEWS listening on port ${port}!`);
  console.log(`Link:"http://localhost:${port}"`);
});
