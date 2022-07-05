const router = require("express").Router();
const TaskController = require("../controllers/task.controller");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, TaskController.createTask);
router.get("/", verifyToken, TaskController.getAllTaskByUser);
router.get("/:id", verifyToken, TaskController.getTaskDetails);
router.delete("/:id", verifyToken, TaskController.deleteTask);
router.patch("/:id", verifyToken, TaskController.updateTask);
module.exports = router;
