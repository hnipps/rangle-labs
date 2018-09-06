const express = require('express');
const Router = express.Router;
const router = Router();
const Project = require('../models/Project');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Project.find().populate('agents').populate('technologies').populate('projectLead');
    res.status(200).json({docs});
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

router.get('/:project_id', async (req, res, next) => {

  try {
    const { project_id } = req.params;
    const docs = await Project.findById(project_id).populate('agents').populate('technologies').populate('projectLead');
    res.status(200).send(docs);
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

// Add a new project
router.post("/", async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    difficulty: req.body.difficulty,
    status: req.body.status,
    technologies: req.body.technologies,
    projectLead: req.body.projectLead,
    agents: req.body.agents,
    trelloBoardUrl: req.body.trelloBoardUrl,
    githubUrl: req.body.githubUrl
  });

  project
    .save()
    .then(doc => {
      res.status(200).send({ message: "success", payload: doc });
    })
    .catch(err => {
      console.error("An error occurred while adding a new project:", err);
      res.status(500).send({ message: err.message });
    });
});

// Update an existing project
router.patch("/:project_id", async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const doc = await Project.findByIdAndUpdate(project_id, req.body);
    res.status(200).send(doc);
  } catch (err) {
    console.error("An error occurred while updating an existing agent:", err);
    next(err);
  }
});

// Delete a project
router.delete("/:project_id", async (req, res, next) => {
  console.log("DELETING A PROJECT");
  try {
    const { project_id } = req.params;
    const doc = await Project.findByIdAndRemove(project_id);
    res.status(204).send(doc);
  } catch (err) {
    console.log("An error occurred while deleting a project:", err);
    next(err);
  }
});

module.exports = router;
