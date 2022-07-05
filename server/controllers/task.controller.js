const db = require("../models");
const taskSchema = require("../utils/taskValidation");
const Tasks = db.tasks;
const Users = db.users;

// @addtask
const createTask = async (req, res) => {
  const user = await Users.findOne({ where: { email: req.user.email } });
  let task = {
    task_name: req.body.task_name,
    user_id: user.id,
    description: req.body.description,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };
  if (taskSchema.validate(task).error) {
    res.status(200).send({
      error: taskSchema.validate(task).error.details[0].message.toString(),
    });
  } else {
    await Tasks.create(task).then(() => {
      return res.status(200).send({
        success: `Task added Successfully`,
      });
    });
  }
};

// @get all task by user
const getAllTaskByUser = async (req, res) => {
  const user = await Users.findOne({ where: { email: req.user.email } });
  const tasks = await Tasks.findAndCountAll({ where: { user_id: user.id } });
  if (tasks) {
    res.status(200).send({ success: tasks });
  } else {
    res.status(404).send({ failed: "No tasks found" });
  }
};

// @ single task details
const getTaskDetails = async (req, res) => {
  const task = await Tasks.findOne({ where: { id: req.params.id } });
  if (task) {
    res.status(200).send({ task });
  } else {
    res.status(404).send({ failed: "No task found" });
  }
};

// @delete task
const deleteTask = async (req, res) => {
  const task = await Tasks.destroy({ where: { id: req.params.id } });
  if (task) {
    res.status(200).send({ success: "Task deleted" });
  } else {
    res.status(404).send({ failed: "No task found" });
  }
};

module.exports = {
  createTask,
  getAllTaskByUser,
  getTaskDetails,
  deleteTask,
};
