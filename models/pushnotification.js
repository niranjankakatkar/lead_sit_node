const mongoose = require("../config/dbConfig");

const PushNotificationSchema = new mongoose.Schema({
  title: String,
  filename: String,
  filepath: String,
  zone: String,
  sendto: String,
  description: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
