const mongoose = require("../config/dbConfig");

const franchiseeSchema = new mongoose.Schema({
  franchisee: String,
  oname: String,
  email: String,
  mobileno: String,
  address: String,
  password: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "0" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
});

module.exports = mongoose.model("Franchisee", franchiseeSchema);
