const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy(
   async function(token, done) {
  
    try{

      const user = jwt.verify(token, process.env.JWT_SECRET);

      return done(null, user);

    }catch(err){

      global.reportAppError(err);

      return done(null, false);
    }
  }
));

module.exports = passport.authenticate('bearer', { session: false });