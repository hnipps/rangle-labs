const express = require("express");
const Router = express.Router;
const router = Router();
const User = require("../models/User");
require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/users/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Finding user...");
      console.log(`User profile:`, profile);

      User.findOneAndUpdate(
        {
          googleId: profile.id
        },
        {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        },
        { upsert: true, new: true },
        (error, user) => {
          return done(error, user);
        }
      );
    }
  )
);

router.get("/", async (req, res, next) => {
  try {
    const docs = await User.find();
    res.status(200).send(docs);
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get("/auth/google", [
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
]);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
