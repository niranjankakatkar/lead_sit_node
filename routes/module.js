const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const ModuleModel = require("../models/module");

router.post("/createModule", (req, res) => {
  ModuleModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllModule", (req, res) => {
  ModuleModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleModule/:id", (req, res) => {
  const id = req.params.id;
  ModuleModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleModule/:id", (req, res) => {
  const id = req.params.id;
  ModuleModel.findByIdAndUpdate(
    { _id: id },
    {
      module: req.body.module,
      imageurl: req.body.imageurl,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleModule/:id", (req, res) => {
  const id = req.params.id;
  ModuleModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

module.exports = router;
