const mongoose = require("../config/dbConfig");

const CashbackSchema = new mongoose.Schema({
  title: String,
  filename: String,
  filepath: String,
  customer: String,
  cashback: String,
  minpurchase: String,
  maxdiscount: String,
  startdate: String,
  enddate: String,
  limit: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cashback", CashbackSchema);
