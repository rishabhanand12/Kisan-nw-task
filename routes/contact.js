let express = require("express");
let controller = require("../controllers/contact");
let router = express.Router();

router.get("/", controller.getContacts); //get request to fetch user name and phone for all contacts

router.post("/", controller.addContact); //post request to add a new contact

router.get("/messages", controller.getMessagesForContact);

module.exports = router;
