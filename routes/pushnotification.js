const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const PushNotificationModel = require("../models/pushnotification");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/pushnotification");
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

router.post(
  "/createPushNotificationImg",
  upload.single("file"),
  async (req, res) => {
    const title = req.body.title;
    const zone = req.body.zone;
    const sendto = req.body.sendto;
    const description = req.body.description;

    const { path, filename } = req.file;

    PushNotificationModel.create({
      title: title,
      zone: zone,
      sendto: sendto,
      description: description,
      filepath: path,
      filename: filename,
    })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  }
);

router.post("/createPushNotification", (req, res) => {
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

  PushNotificationModel.create({
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

router.get("/getAllPushNotification", (req, res) => {
  PushNotificationModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getImagePushNotification/:id", (req, res) => {
  const id = req.params.id;
  try {
    const file = PushNotificationModel.findById({ _id: id });
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

router.get("/getSinglePushNotification/:id", (req, res) => {
  const id = req.params.id;
  PushNotificationModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSinglePushNotification/:id", (req, res) => {
  const id = req.params.id;
  PushNotificationModel.findByIdAndUpdate(
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

router.delete("/deleteSinglePushNotification/:id", (req, res) => {
  const id = req.params.id;
  PushNotificationModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  PushNotificationModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  PushNotificationModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  PushNotificationModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
