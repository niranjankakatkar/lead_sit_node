const mongoose = require("../config/dbConfig");

const MenuAssignSchema = new mongoose.Schema({
  role: String,
  menu_id: String,
  link_id: String,
  sub_link_id: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("menu_assign_master", MenuAssignSchema);
