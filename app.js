// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

// internal imports
const { errorHandler, notFoundHandler } = require('./middlewares/common/errorHandler');
const app = express();
dotenv.config();

mongoose
    .connect(`mongodb+srv://ansar41:ansarali6666@cluster0.yf6o8.mongodb.net/chat?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('Database connection established!'))
    .catch(err => console.log('error: ' + err.message));

// request process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

//error handling
// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
