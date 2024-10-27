const mongoose = require("../config/dbConfig");

const moduleSchema = new mongoose.Schema({
  username: String,
  password:String, 
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("admin_auth", moduleSchema);