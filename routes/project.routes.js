const router = require("express").Router();
const mongoose = require("mongoose");

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

// GET /api/projects - Retrieves all the projects
router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch((error) => {
      console.log("Error while getting projects");
      console.log(error);
      res.status(500).json({ message: "Error while getting projects" });
    });
});

// GET /api/projects/:projectId - Retrieves specific project by id
router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
    .populate("tasks")
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log("Error while retrieving the project");
      console.log(error);
      res.status(500).json({ message: "Error while retrieving the project" });
    });
});

// PUT /api/proejct/:projectId - Updates specific project by id
router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((error) => {
      console.log("Error while updating project");
      console.log(error);
      res.status(500).json({ message: "Error while updating project" });
    });
});

// DELETE /api/proejct/:projectId - Deletes specific project by id
router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndDelete(projectId)
    .then(() => {
      res.json({
        message: `Project with id: ${projectId} was removed successfully`,
      });
    })
    .catch((error) => {
      console.log("Error while deleting the project");
      console.log(error);
      res.status(500).json({ message: "Error while deleting the project" });
    });
});

module.exports = router;
