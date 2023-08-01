const router = require("express").Router();
const docController = require("../Controllers/document");
const validation = require("../middleware/authorization");

router.get("/createNewDocument", validation, docController.createNewDocument);

module.exports = router;
