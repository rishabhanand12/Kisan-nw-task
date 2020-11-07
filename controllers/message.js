let Message = require("../models/message");

exports.getMessages = async (req, res, next) => {
  try {
    let messages = await Message.find({})
      .sort({ time: -1 })
      .select("content time")
      .populate("contact", "name phone picture slug")
      .exec();
    res.json({
      data: messages,
    });
  } catch (err) {
    next("Bad Request");
  }
};
