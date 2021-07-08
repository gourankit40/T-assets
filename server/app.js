const path = require('path');
var cors = require('cors');
const express = require('express');
const app = express()
const session = require('express-session');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const varible = require('dotenv').config();

/*--custom imports--*/
const authRoute = require('./modules/login/auth')
var mysql = require('./core/conn');
var varifyJWT = require('./core/varifyJwt');

const hostname = process.env.HOSTNAME;
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../my-app/build')));
app.use(express.json());
app.use(cors({
  origin: [process.env.LOCAL_URL],
  methods: ['GET','POST'],
  credentials: true	
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  if (!req.session.user) {
      req.session.user = { islogin : false };
  } else {
	  req.session.user = { islogin : true };
  }
  
  console.log('inside root');
  var hour = 360000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  next()
})

/*--user rest--*/
app.use(process.env.USER_REST,authRoute);

var con = mysql;
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

app.get('/isUserAuth', varifyJWT,(req, res) => {
  res.send('congrates aithenticated....');
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/api', (req, res) => {
  res.json({message: 'Hello, this is Ankit from server!'});
})
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, '../my-app/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
