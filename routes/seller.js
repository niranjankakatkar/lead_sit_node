const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const SellerModel = require("../models/seller");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/seller");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    return cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadimg", upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
});

router.post("/createSellerImg", upload.single("file"), async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const tax = req.body.tax;
  const time = req.body.time;
  const zone = req.body.zone;
  const lat = req.body.lat;
  const long = req.body.long;
  const ofname = req.body.ofname;
  const olname = req.body.olname;
  const mobileno = req.body.mobileno;
  const email = req.body.email;
  const password = req.body.password;
  const { path, filename } = req.file;

  SellerModel.create({
    name: name,
    address: address,
    tax: tax,
    time: time,
    zone: zone,
    lat: lat,
    long: long,
    ofname: ofname,
    olname: olname,
    mobileno: mobileno,
    email: email,
    password: password,
    filepath: path,
    filename: filename,
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/createSeller", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobileno = req.body.mobileno;
  const password = req.body.password;
  const path = "";
  const filename = "";

  SellerModel.create({
    name: name,
    email: email,
    mobileno: mobileno,
    password: password,
    filepath: path,
    filename: filename,
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllSeller", (req, res) => {
  SellerModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getImageSeller/:id", (req, res) => {
  const id = req.params.id;
  try {
    const file = SellerModel.findById({ _id: id });
    if (!image) res.send({ msg: "Image Not Found" });

    const filepath = path.join(__dirname, "../document/users", image.filename);
    res.sendFile(filepath);
  } catch (error) {
    res.send({ error: "Image Not Found" + error });
  }
});

//router.post("/register",signupController.createUser);

router.get("/getSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  SellerModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  SellerModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      mobileno: req.body.mobileno,
      password: req.body.password,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  SellerModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  SellerModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  SellerModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  SellerModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
