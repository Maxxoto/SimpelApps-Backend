const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// Models
const mongoose = require('mongoose');
const User = mongoose.model('user');

// Passport setup
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'simpelapps';
opts.audience = 'api.simpelapps.web.id';

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        const hash = await user.verifyPassword(password);
        if (!hash) {
          return done(null, false, {
            errors: { message: 'Email atau password salah !' },
          });
        }

        return done(null, user);
      }

      return done(null, false, {
        errors: { message: 'Email atau password salah !' },
      });
    } catch (e) {
      return done(null, false, {
        errors: { message: e },
      });
    }
  }),
);

passport.use;
new JwtStrategy(opts, (payload, done) => {
  User.findOne({ _id: payload.data }, (err, user) => {
    //Mencocokan _id dengan isi payload.data
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});
