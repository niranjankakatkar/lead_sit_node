const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const AdvertisementModel = require("../models/advertisement");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/advertisement");
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
  "/createAdvertisementImg",
  upload.single("file"),
  async (req, res) => {
    const moduleId = req.body.moduleId;
    const categoryId = req.body.categoryId;
    const subcategoryId = req.body.subcategoryId;
    const title = req.body.title;
    const description = req.body.description;
    const seller = req.body.seller;
    const priority = req.body.priority;
    const type = req.body.type;
    const validity = req.body.validity;
    const review = req.body.review;
    const rating = req.body.rating;
    const { path, filename } = req.file;

    AdvertisementModel.create({
      moduleId: moduleId,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      title: title,
      description: description,
      seller: seller,
      priority: priority,
      type: type,
      validity: validity,
      review: review,
      rating: rating,
      filepath: path,
      filename: filename,
    })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  }
);

router.post("/createAdvertisement", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const seller = req.body.seller;
  const priority = req.body.priority;
  const type = req.body.type;
  const validity = req.body.validity;
  const review = req.body.review;
  const rating = req.body.rating;
  const path = "";
  const filename = "";

  AdvertisementModel.create({
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

router.get("/getAllAdvertisement", (req, res) => {
  AdvertisementModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getImageAdvertisement/:id", (req, res) => {
  const id = req.params.id;
  try {
    const file = AdvertisementModel.findById({ _id: id });
    if (!image) res.send({ msg: "Image Not Found" });

    const filepath = path.join(
      __dirname,
      "../document/advertisement",
      image.filename
    );
    res.sendFile(filepath);
  } catch (error) {
    res.send({ error: "Image Not Found" + error });
  }
});

//router.post("/register",signupController.createUser);

router.get("/getSingleAdvertisement/:id", (req, res) => {
  const id = req.params.id;
  AdvertisementModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleAdvertisement/:id", (req, res) => {
  const id = req.params.id;
  AdvertisementModel.findByIdAndUpdate(
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

router.delete("/deleteSingleAdvertisement/:id", (req, res) => {
  const id = req.params.id;
  AdvertisementModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  AdvertisementModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  AdvertisementModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  AdvertisementModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
