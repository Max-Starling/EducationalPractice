
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
app.use(express.static('public'));
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
}, {
  autoIndex: process.env.mode === 'development',
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

//  For cheking user  //
app.get('/checkUser', (req, res) => {
  console.log(req.query);
  if (!req.query) {
    res.sendStatus(500);
  } else if (req.query.username && req.query.password) {
    if (users.findOne({ username: req.query.username, password: req.query.password })) {
      res.json(true);
    } else {
      res.json(false);
    }
  } else if (req.query.username) {
    if (users.findOne({ username: req.query.username })) {
      res.json(true);
    } else {
      res.json(false);
    }
  }
});

//  For getting news  //
app.get('/news', (req, res) => {
  news.find({}, {},
    {
      skip: Number(req.query.skip),
      limit: Number(req.query.limit),
      sort: { $natural: -1 },
    },
    (error, n) => (error ? res.sendStatus(500) : res.json(n)));
});

//  For getting new  //
app.get('/news/:ID', (req, res) => {
  news.findById(req.body.ID, (error, n) => (error ? res.sendStatus(500) : res.json(n)));
});

//  For getting size  //
app.get('/newsSize', (req, res) => {
  news.count({}, ((error, count) => (error ? res.sendStatus(500) : res.json(count))));
});

//  For adding new  //
app.post('/postNew', (req, res) => {
  const n = {
    title: req.body.title,
    summary: req.body.summary,
    createdAt: req.body.createdAt,
    author: req.body.author,
    content: req.body.content,
    img: req.body.img,
  };
  const post = new news(n);
  post.save()
    .then(() => res.json(post))
    .catch(error => res.sendStatus(500));
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
  console.log(req.body);
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

//  For getting current user  //
app.get('/currentUser', (req, res) => {
  const pass = req.session.passport;
  if (pass) {
    res.json({
      username: pass.user.username,
      img: pass.user.img,
      rank: pass.user.rank,
    });
  } else {
    res.json(false);
  }
});
//  ========== PORT ==========  //

const port = '7777';
app.listen(port, () => {
  console.log(`STARLING NEWS listening on port ${port}!`);
  console.log(`Click "Ctrl + LMC" on this link:"http://localhost:${port}"`);
});
