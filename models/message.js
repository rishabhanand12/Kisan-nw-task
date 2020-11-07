let mongoose = require("mongoose");
let messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    time: {
      type: Number,
    },
    sid: {
      type: String,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  },
  { timestamps: true }
);

let Message = mongoose.model("Message", messageSchema);
module.exports = Message;
