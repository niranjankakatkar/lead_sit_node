const mongoose = require("../config/dbConfig");

const categorySchema = new mongoose.Schema({
  category: String,
  module: String,
  imageurl: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", categorySchema);
