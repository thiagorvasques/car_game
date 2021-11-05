const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  model: { type: String, required: true },
  votes: [Number],
});

module.exports = mongoose.model("Car", schema);
