require('dotenv').config();

const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./data/ezstudy-db');
port = 3000

app.use(expressValidator());
app.use(cookieParser());

app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

require('./controllers/cards.js')(app);

// TODO: Add each controller here, after all middleware is initialized.


// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  

module.exports = app;
