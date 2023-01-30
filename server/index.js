require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const sanitize = require('sanitize');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

//MONGODB
const connection = process.env.MONGO_CONNECTION;

const store = new MongoDBStore({
    uri: connection,
    collection: 'sessions'
})

mongoose.set('strictQuery', false);
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    console.log("Connected to the DB");
}).catch((e) => {
    console.log(e);
});
//END MONGODB

app.set('port', 3000);

//MIDDLEWARES
app.use(session({
    secret: 'test', //process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*24*7, //one week
        httpOnly: true,
        secure: true
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

app.use(sanitize.middleware);

app.use(morgan('dev', {
    skip: (req, res) => req.originalUrl.includes('/static')
}));

app.use(express.json());

app.use(cors({origin: '*'}));
//END MIDDLEWARES

//ROUTES
app.use('/', require('./routes/app.routes'));
app.use('/api', require('./routes/api.routes'));
app.use('/static', express.static(path.join(__dirname, '/public')));
//END ROUTES

const server = app.listen(app.get('port'), () => {
    console.log("Server running on: http://localhost:" + app.get('port'));
})