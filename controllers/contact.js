let Contact = require("../models/contact");
let slugify = require("slugify");

exports.addContact = async (req, res, next) => {
  try {
    let { name, phone } = req.body;
    // checking if contact already exists
    let contact = await Contact.findOne({ name: name });
    if (contact) {
      //send error if contact already exists
      next(`${contact.name.first} ${contact.name.last} already exists`);
    } else {
      let slug = slugify(`${name.first} ${name.last}`);
      let query = {
        name,
        phone,
        slug,
      };
      let newContact = await Contact.create(query);
      res.json({
        message: `${newContact.name.first} ${newContact.name.last} created`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (_req, res, next) => {
  try {
    let contactList = await Contact.find({}, "slug name phone picture");
    res.json({
      data: contactList,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMessagesForContact = async (req, res, next) => {
  try {
    let first = req.query.name.split("-")[0];
    let last = req.query.name.split("-")[1];
    let query = {
      first,
      last,
    };
    let messages = await Contact.findOne(
      { name: query },
      "slug name phone picture"
    )
      .populate("messages", "content time")
      .sort({ time: 1 })
      .exec();
    res.json({
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};
