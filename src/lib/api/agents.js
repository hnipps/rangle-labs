const express = require("express");
const Router = express.Router;
const router = Router();
const Agent = require("../models/Agent");

// Get all the agents
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

// Get a specific agent by ID
router.get("/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;
    const docs = await Agent.findById(agent_id)
      .populate("currentTechnologies")
      .populate("aspirationalTechnologies");
    res.status(200).send(docs);
  } catch (err) {
    console.error("An error occurred while getting a specific agent:", err);
    next(err);
  }
});

// Add a new agent
router.post("/", async (req, res) => {
  const agent = new Agent({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    image: req.body.image,
    currentTechnologies: req.body.currentTechnologies,
    aspirationalTechnologies: req.body.aspirationalTechnologies,
    currentFreeAgent: req.body.currentFreeAgent
  });

  agent
    .save()
    .then(doc => {
      res.status(200).send({ message: "success", payload: doc });
    })
    .catch(err => {
      console.error("An error occurred while adding a new agent:", err);
      res.status(500).send({ message: err.message });
    });
});

// Update an existing agent
router.patch("/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;
    const doc = await Agent.findByIdAndUpdate(agent_id, req.body);
    res.status(200).send(doc);
  } catch (err) {
    console.error("An error occurred while updating an existing agent:", err);
    next(err);
  }
});

// Delete an agent
router.delete("/:agent_id", async (req, res, next) => {
  console.log("DELETING AN AGENT");
  try {
    const { agent_id } = req.params;
    const doc = await Agent.findByIdAndRemove(agent_id);
    res.status(204).send(doc);
  } catch (err) {
    console.log("An error occurred while deleting an agent:", err);
    next(err);
  }
});

router.get("/search/:search_term", async (req, res, next) => {
  try {
    const { search_term } = req.params
    const docs = await Agent.find()
      .populate("currentTechnologies")
      .populate("aspirationalTechnologies");
    const filteredDocs = docs.filter(agent => {
        const matchFirstName = agent.firstName.toLowerCase().match(search_term.toLowerCase());
        const matchLastName = agent.lastName.toLowerCase().match(search_term.toLowerCase());
        return matchFirstName !== null || matchLastName !== null;
      });
    res.status(200).send(filteredDocs);
  } catch (err) {
    console.error("An error occurred while searching for a specific agent:", err);
    next(err);
  }
})

module.exports = router;
