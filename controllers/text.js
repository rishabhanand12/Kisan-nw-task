let twilio = require("twilio");
let Message = require("../models/message");
let Contact = require("../models/contact");

let client = twilio(process.env.ACCOUNT_SSID, process.env.AUTH_TOKEN);

exports.sendText = async (req, res, next) => {
  try {
    let { text, recepient, name } = req.body;
    let message = await client.messages.create({
      body: text,
      to: recepient,
      from: "+12059645011",
    });
    let messageSid = message.sid;
    let contact = await Contact.findOne({ name: name });
    // saving message in database
    let newMessage = await Message.create({
      content: text,
      sid: messageSid,
      time: Date.now(),
      contact: contact.id,
    });
    // updating contact's messages in database
    await Contact.findOneAndUpdate(
      { _id: contact.id },
      { $push: { messages: newMessage.id } }
    );
    // contact.updateMessages(newMessage.id);
    res.json({
      message: `Message sent`,
    });
  } catch (err) {
    next("Message could not be sent");
  }
};
