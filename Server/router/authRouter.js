const app = require("express")();
const authController = require("../Controllers/auth");

app.post("/signUp", authController.signUp);


