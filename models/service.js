const mongoose = require("../config/dbConfig");

const serviceSchema = new mongoose.Schema({
  service: String,
  filename: String,
  filepath: String,
  moduleId: String,
  categoryId: String,
  subcategoryId: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);