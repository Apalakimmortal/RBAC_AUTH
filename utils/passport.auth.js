// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user.model');

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         // Username/email does NOT exist
//         if (!user) {
//           return done(null, false, {
//             message: 'Username/email not registered',
//           });
//         }
//         // Email exist and now we need to verify the password
//         const isMatch = await user.isValidPassword(password);
//         return isMatch
//           ? done(null, user)
//           : done(null, false, { message: 'Incorrect password' });
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

// Local Strategy for user authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // Username/email does NOT exist
        if (!user) {
          return done(null, false, {
            message: 'Username/email not registered',
          });
        }
        // Email exists, now we need to verify the password
        const isMatch = await user.isValidPassword(password);
        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password' });
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize user into session (store user ID)
passport.serializeUser(function (user, done) {
  done(null, user.id); // Storing the user ID in session
});

// Deserialize user from session (find user by ID)
passport.deserializeUser(async function (id, done) {
  try {
    // Using async/await with findById
    const user = await User.findById(id); // This should be an async call
    done(null, user);
  } catch (err) {
    done(err);
  }
});
