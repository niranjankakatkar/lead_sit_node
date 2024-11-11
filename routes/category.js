const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const router = express.Router();

const CategoryModel = require("../models/category");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/category");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    return cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/createCategoryImg", upload.single("file"), async (req, res) => {
  const category = req.body.category;
  const moduleID = req.body.moduleId; // Change moduleId to moduleID here
  const { path, filename } = req.file;

  CategoryModel.create({
    category: category,
    filepath: path,
    filename: filename,
    moduleID: moduleID, // Ensure this matches your schema
  })
    .then((category) => res.json(category))
    .catch((err) => res.json(err));
});

router.post("/createCategory", (req, res) => {
  CategoryModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllCategory", (req, res) => {
  CategoryModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getCategoriesByModule/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;

  CategoryModel.find({ moduleID: moduleId }) // Updated to `moduleID`
    .then((categories) => {
      if (categories.length === 0) {
        return res
          .status(404)
          .json({ message: "No categories found for this module ID" });
      }
      res.json(categories);
    })
    .catch((err) =>
      res.status(500).json({
        error: "An error occurred while fetching categories",
        details: err,
      })
    );
});

router.get("/getSingleCategory/:id", (req, res) => {
  const id = req.params.id;
  CategoryModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleCategory/:id", (req, res) => {
  const id = req.params.id;
  CategoryModel.findByIdAndUpdate(
    { _id: id },
    {
      category: req.body.category,
      module: req.body.module,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleCategory/:id", (req, res) => {
  const id = req.params.id;
  CategoryModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  CategoryModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  CategoryModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  CategoryModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
