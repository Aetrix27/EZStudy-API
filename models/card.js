const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  topic: { type: String, required: true },
  exercises: { type: String, required: true }
});

module.exports = mongoose.model("Card", PostSchema);