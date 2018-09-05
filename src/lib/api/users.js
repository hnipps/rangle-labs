require("dotenv").config();
const express = require("express");
const Router = express.Router;
const router = Router();
const User = require("../models/User");
const Agent = require("../models/Agent");

const passport = require("passport");

const findOrCreateAgentByUser = (user, res, next) => {
  Agent.findOne({ userId: user._id }, (err, agentByUserId) => {
    if (err) {
      console.error("Error finding agent by ID: ", err);
    }
    if (!agentByUserId) {
      Agent.findOneAndUpdate(
        { firstName: user.firstName, lastName: user.lastName },
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        },
        { upsert: true, new: true },
        (err, agentByName) => {
          if (err) {
            console.error(
              "An error occurred when finding an agent with this user's name: ",
              err
            );
            next(err);
          }
          if (agentByName) {
            res.redirect(`${process.env.CLIENT_URL}/login?loggedIn=true&firstTimeLogin=true&agentId=${agentByName._id}`);
          }
        }
      );
    }
    if (agentByUserId) {
      res.redirect(`${process.env.CLIENT_URL}/login?loggedIn=true`);
      return;
    }
  });
};

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
  (req, res, next) => {
    findOrCreateAgentByUser(req.user, res, next);
  }
);

module.exports = router;
