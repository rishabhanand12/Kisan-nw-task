let express = require("express");
let controller = require("../controllers/message");
let router = express.Router();

router.get("/", controller.getMessages); //route to get all messages sent

module.exports = router;
