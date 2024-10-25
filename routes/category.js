const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const CategoryModel = require("../models/category");

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

module.exports = router;
