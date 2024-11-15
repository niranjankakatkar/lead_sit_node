const mongoose = require("../config/dbConfig");

const CouponSchema = new mongoose.Schema({
  title: String,
  filename: String,
  filepath: String,
  coupontype: String,
  store: String,
  customer: String,
  code: String,
  limit: String,
  startdate: String,
  enddate: String,
  discounttype: String,
  discount: String,
  maxdiscount: String,
  mindiscount: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coupon", CouponSchema);
