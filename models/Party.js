const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
  title: {
    type: String
  },
  tags: {
    type: String
  },
  organizer: {
    type: String
  },
  details: {
    type: String
  },
  contact_info: {
    type: String
  }
});

module.exports = mongoose.model("Party", PartySchema);
