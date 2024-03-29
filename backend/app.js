const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config()

const db = require('./lib/db.js');


const app = express();

app.use(helmet({crossOriginResourcePolicy: false,crossOriginEmbedderPolicy: false}));

// cors
// app.use(cors());
// app.use(
//     cors({
//         credentials: true, 
//         origin: function (origin, callback) {
//             if (process.env.CORS_WHITELIST.indexOf(origin) !== -1) {
//                 callback(null, true)
//             } else {
//                 console.log("failed",origin);
//                 callback(new Error('Not allowed by CORS'))
//             }
//         }
//     })
// );

app.use(cors({
    credential:true,
    origin:'https://list-frontend.onrender.com',
    allowedHeaders:'Content-Type'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
    store: new pgSession({
        pool:db,
        tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // only create session when something gets stored
    resave: false,
    cookie: {
        sameSite: process.env.PRODUCTION?'none':false, 
        secure: process.env.PRODUCTION?true:false,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

app.set('views', path.join(__dirname, 'views'));

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks.js');
const sessionsRouter = require('./routes/sessions.js');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/sessions',sessionsRouter);


app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
