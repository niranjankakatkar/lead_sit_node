const mongoose = require("../config/dbConfig");

const subcategorySchema = new mongoose.Schema({
  subcategory: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  filename:String,
  filepath:String, 
  moduleID:String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
