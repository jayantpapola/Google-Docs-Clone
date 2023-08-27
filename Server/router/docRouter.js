const router = require("express").Router();
const docController = require("../Controllers/document");
const validation = require("../middleware/authorization");

router.get("/createNewDocument", validation, docController.createNewDocument);
router.get("/getAllDocs", validation, docController.getAllDocs);
router.get("/fetchContent/:id", validation, docController.fetchContent);
router.post("/saveContent/:id", validation, docController.saveContent);

module.exports = router;
