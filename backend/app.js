const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mainRouter = require('./routes/mainRotuer');
app.use(cors());
app.use(fileUpload());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//URLS
app.use('/api', mainRouter);
//URLS
app.use('/js', (req,resp)=>{
    resp.json({message: 'hello'});
});

// app.options('*', cors());

app.use((req, res, next) =>  {
  next(createError(404));
});



app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.json({'error': `something went wrong: ${err.message}`});
});

module.exports = app;
