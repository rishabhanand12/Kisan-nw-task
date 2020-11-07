let express = require("express");
let controller = require("../controllers/text");
let router = express.Router();

router.post("/", controller.sendText); // controller that sends sms sending

module.exports = router;
