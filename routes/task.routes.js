const router = require("express").Router();

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

router.post("/tasks", (req, res, next) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log("Error while creating task");
      console.log(error);
      res.status(500).json({ message: "Error while creating task" });
    });
});

module.exports = router;
