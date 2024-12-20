const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init MongoStore
const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  collectionName: 'sessions',
});

// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true, // Uncomment for HTTPS
    },
    store: MongoStore, 
  })
);

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

// Middleware to ensure `user` is always available in views
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Ensure `user` is always available
  next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use(
  '/user',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('./routes/user.route')
);
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./routes/admin.route')
);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error, user: req.user }); // Pass user explicitly to the error page
});

// Ensure Admin Middleware
function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'You are not authorized to view this page.');
    res.redirect('/');
  }
}

// Setting the PORT
const PORT = process.env.PORT || 3000;

// Making a connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('MongoDB connected...');
    startServer();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit on connection error
  });

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
