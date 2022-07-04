const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/", UserController.createUser);
router.get("/login", UserController.loginUser);

module.exports = router;
