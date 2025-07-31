const router = require("express").Router();

const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

// POST /api/projects - Create new project
router.post("/projects", (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, tasks: [] })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log("Error while creating the project");
      console.log(error);
      res.status(500).json({ message: "Error while creating the project" });
    });
});

module.exports = router;
