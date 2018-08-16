const express = require("express");
const Router = express.Router;
const router = Router();
const Agent = require("../models/Agent");

router.get("/", async (req, res, next) => {
  try {
    const docs = await Agent.find()
      .populate("currentTechnologies")
      .populate("aspirationalTechnologies");
    res.status(200).send(docs);
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

router.get("/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;
    const docs = await Agent.findById(agent_id)
      .populate("currentTechnologies")
      .populate("aspirationalTechnologies");
    res.status(200).send(docs);
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

router.post("/", async (req, res) => {
  // console.log("req", req.body);

  console.log("ADDING NEW AGENT", req.body);

  // const agent = new Agent({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   role: req.body.role,
  //   image: req.body.image,
  //   currentTechnologies: req.body.currentTechnologies,
  //   aspirationalTechnologies: req.body.aspirationalTechnologies,
  //   currentFreeAgent: req.body.currentFreeAgent
  // });

  // agent
  //   .save()
  //   .then(doc => {
  //     res.status(200).send({ message: "success", payload: doc });
  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
});

router.patch("/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;
    const doc = await Agent.findByIdAndUpdate(agent_id, req.body);
    res.status(200).send(doc);
  } catch (err) {
    next(err);
  }
});

router.delete("/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;
    const doc = await Agent.findByIdAndRemove(agent_id);
    res.status(204).send(doc);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
