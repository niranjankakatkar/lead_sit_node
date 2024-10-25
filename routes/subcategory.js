const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const SubcategoryModel = require("../models/subcategory");

router.post("/createSubcategory", (req, res) => {
  SubcategoryModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllSubcategory", (req, res) => {
  SubcategoryModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findByIdAndUpdate(
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

router.delete("/deleteSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

module.exports = router;
