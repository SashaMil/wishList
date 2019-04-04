// Instantiate Express Server
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Passport Session Configuration
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes:
const wishlistRouter = require('./routes/wishlist.router');
const userRouter = require('./routes/user.router');

app.use('/wishlists', wishlistRouter);
app.use('/users', userRouter);

// Determine server Scope
app.use(express.static('build'));

// Define and listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('listening on port', PORT);
});
