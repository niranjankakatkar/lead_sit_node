const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const CouponModel = require("../models/coupons");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/coupons");
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

router.post("/createCouponImg", upload.single("file"), async (req, res) => {
  const moduleId = req.body.moduleId;
  const categoryId = req.body.categoryId;
  const subcategoryId = req.body.subcategoryId;
  const title = req.body.title;
  const coupontype = req.body.coupontype;
  const store = req.body.store;
  const customer = req.body.customer;
  const code = req.body.code;
  const limit = req.body.limit;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const discounttype = req.body.discounttype;
  const discount = req.body.discount;
  const mindiscount = req.body.mindiscount;
  const maxdiscount = req.body.maxdiscount;

  const { path, filename } = req.file;

  CouponModel.create({
    moduleId: moduleId,
    categoryId: categoryId,
    subcategoryId: subcategoryId,
    title: title,
    coupontype: coupontype,
    store: store,
    customer: customer,
    code: code,
    limit: limit,
    startdate: startdate,
    enddate: enddate,
    discounttype: discounttype,
    discount: discount,
    mindiscount: mindiscount,
    maxdiscount: maxdiscount,

    filepath: path,
    filename: filename,
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/createCoupon", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const discount = req.body.discount;
  const mindiscount = req.body.mindiscount;
  const maxdiscount = req.body.maxdiscount;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const limit = req.body.limit;
  const path = "";
  const filename = "";

  CouponModel.create({
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

router.get("/getAllCoupon", (req, res) => {
  CouponModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getImageCoupon/:id", (req, res) => {
  const id = req.params.id;
  try {
    const file = CouponModel.findById({ _id: id });
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

router.get("/getSingleCoupon/:id", (req, res) => {
  const id = req.params.id;
  CouponModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleCoupon/:id", (req, res) => {
  const id = req.params.id;
  CouponModel.findByIdAndUpdate(
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

router.delete("/deleteSingleCoupon/:id", (req, res) => {
  const id = req.params.id;
  CouponModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  CouponModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  CouponModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  CouponModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
