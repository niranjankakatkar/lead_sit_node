const mongoose = require("../config/dbConfig");

const AdvertisementSchema = new mongoose.Schema({
  moduleId: String,
  categoryId: String,
  subcategoryId: String,
  title: String,
  filename: String,
  filepath: String,
  description: String,
  seller: String,
  priority: String,
  type: String,
  validity: String,
  review: String,
  rating: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Advertisement", AdvertisementSchema);
