const router = require("express").Router();
const TaskController = require("../controllers/task.controller");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, TaskController.createTask);

module.exports = router;
