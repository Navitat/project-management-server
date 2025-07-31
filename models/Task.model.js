const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskModel = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("Task", taskSchema);
