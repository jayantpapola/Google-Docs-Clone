const router = require("express").Router();
const authController = require("../Controllers/auth");

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);

module.exports = router;
