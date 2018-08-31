const express = require("express");
const Router = express.Router;
const router = Router();
const User = require("../models/User");

const passport = require("passport");

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
    res.redirect(`http://localhost:3000/login?loggedIn=true`);
  }
);

module.exports = router;
