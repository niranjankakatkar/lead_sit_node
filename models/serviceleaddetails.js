const mongoose = require("../config/dbConfig");

const categorySchema = new mongoose.Schema({
  serviceId: String,
  imagetitle: String,
  imagedescription: String,
  imagefilename: String,
  imagefilepath: String,
  videotitle: String,
  videodescription: String,
  videofilename: String,       
  videofilepath: String,
  documenttitle: String,
  documentdescription: String,
  documentfilename: String,
  documentfilepath: String,
  howitworks: String,
  tandc: String,
  faqs: String,
  activeFlag: { type: String, enum: ["1", "0"], default: "1" },
  deleteFlag: { type: String, enum: ["1", "0"], default: "0" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Serviceleaddetails", categorySchema);
