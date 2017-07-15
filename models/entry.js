const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: String,
  image: String,
  text: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Entry", entrySchema);
