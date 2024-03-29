require("dotenv").config();
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../model/user.js");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      if (err) {
        console.log("Error in strategy::--".err);
      }
    }
  })
);

module.exports = passport;
