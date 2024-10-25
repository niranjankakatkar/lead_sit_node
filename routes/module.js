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


router.get('/getAllCnt',(req,res)=>{
    ModuleModel.countDocuments().then((count_documents) => {
    res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
})


router.get('/getActiveCnt',(req,res)=>{
    ModuleModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
    res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  }) 
})

router.get('/getInactiveCnt',(req,res)=>{
    ModuleModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
    res.send({"cnt":""+count_documents1}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  }) 
})

module.exports = router;
