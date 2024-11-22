const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const CashbackModel = require("../models/cashback");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/cashback");
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

router.post("/createCashbackImg", upload.single("file"), async (req, res) => {
  const moduleId = req.body.moduleId;
  const categoryId = req.body.categoryId;
  const subcategoryId = req.body.subcategoryId;
  const title = req.body.title;
  const customer = req.body.customer;
  const cashback = req.body.cashback;
  const minpurchase = req.body.minpurchase;
  const maxdiscount = req.body.maxdiscount;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const limit = req.body.limit;
  const { path, filename } = req.file;

  CashbackModel.create({
    moduleId: moduleId,
    categoryId: categoryId,
    subcategoryId: subcategoryId,
    title: title,
    customer: customer,
    cashback: cashback,
    minpurchase: minpurchase,
    maxdiscount: maxdiscount,
    startdate: startdate,
    enddate: enddate,
    limit: limit,
    filepath: path,
    filename: filename,
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/createCashback", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const cashback = req.body.cashback;
  const minpurchase = req.body.minpurchase;
  const maxdiscount = req.body.maxdiscount;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const limit = req.body.limit;
  const path = "";
  const filename = "";

  CashbackModel.create({
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

router.get("/getAllCashback", (req, res) => {
  CashbackModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getImageCashback/:id", (req, res) => {
  const id = req.params.id;
  try {
    const file = CashbackModel.findById({ _id: id });
    if (!image) res.send({ msg: "Image Not Found" });

    const filepath = path.join(
      __dirname,
      "../document/Cashback",
      image.filename
    );
    res.sendFile(filepath);
  } catch (error) {
    res.send({ error: "Image Not Found" + error });
  }
});

//router.post("/register",signupController.createUser);

router.get("/getSingleCashback/:id", (req, res) => {
  const id = req.params.id;
  CashbackModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleCashback/:id", (req, res) => {
  const id = req.params.id;
  CashbackModel.findByIdAndUpdate(
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

router.delete("/deleteSingleCashback/:id", (req, res) => {
  const id = req.params.id;
  CashbackModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  CashbackModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  CashbackModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  CashbackModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
