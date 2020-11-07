let mongoose = require("mongoose");
let contactSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
    },
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    phone: {
      type: Number,
    },
    picture: {
      type: String,
      default: "https://source.unsplash.com/random",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

contactSchema.methods.updateMessages = function (messageId) {
  this.messages.concat(messageId);
  return this.save();
};

let Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
