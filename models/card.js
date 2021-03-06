const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  topic: { type: String, required: true },
  exercises: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true }

});

module.exports = mongoose.model("Card", PostSchema);