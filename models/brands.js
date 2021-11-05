const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  votes: [Number],
});

module.exports = mongoose.model("Brand", schema);
