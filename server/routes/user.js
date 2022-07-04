const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
