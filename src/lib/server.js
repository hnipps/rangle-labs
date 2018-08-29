const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const uri = "mongodb://localhost:27017/rangle-labs";
const bodyParser = require("body-parser");
const PORT = 8080;

const passport = require("passport");

const app = express();
app.use(passport.initialize());
app.use(bodyParser.json()); // necessary to parse the body of axios requests

app.use("/users", require("./api/users"));
app.use("/agents", require("./api/agents"));
app.use("/projects", require("./api/projects"));
app.use("/technologies", require("./api/technologies"));

const statusCodes = {
  internalServer: 500,
  success: 200
};

app.use((appErr, req, res, next) => {
  res.status(statusCodes.internalServer).json({ appErr: appErr.toString() });
});

app.use("/", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.status(statusCodes.success).json({
    status: "ok",
    mesage: "You deserve a pizza"
  });
});

// if the user requests a route that isn't listed here (becuase react-router is taking care of the routing for it),
// direct the user to the index.html page so that react-router can take over the navigation
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, async () => {
  await mongoose.connect(uri);
});
