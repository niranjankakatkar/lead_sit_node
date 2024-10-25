const mongoose = require("../config/dbConfig");

const franchiseeSchema = new mongoose.Schema({
  franchisee: String,
  oname: String,
  email: String,
  mobileno: String,
  address: String,
  password: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Franchisee", franchiseeSchema);
