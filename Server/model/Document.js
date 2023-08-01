const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
  name: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Docs = mongoose.model("docs", docSchema);
module.exports = Docs;
