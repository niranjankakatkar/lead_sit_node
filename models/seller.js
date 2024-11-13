const mongoose = require("../config/dbConfig");

const sellerSchema = new mongoose.Schema({
  name: String,
  filename: String,
  filepath: String,
  address: String,
  tax: String,
  time: String,
  zone: String,
  lat: String,
  long: String,
  ofname: String,
  olname: String,
  mobileno: String,
  email: String,
  password: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Seller", sellerSchema);
