const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  name: String,
  image: String,
  text: String
});

module.exports = mongoose.model("Entry", entrySchema);
