const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const selleronboardingModel = require("../models/selleronboarding");

router.post("/createSeller", (req, res) => {
  selleronboardingModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllSeller", (req, res) => {
  selleronboardingModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  selleronboardingModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  selleronboardingModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
     
      email: req.body.email,
      mobileno: req.body.mobileno,
      bname: req.body.bname,
      btype: req.body.btype,
      baddress: req.body.baddress,
      pincode: req.body.pincode,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleSeller/:id", (req, res) => {
  const id = req.params.id;
  selleronboardingModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get('/getAllCnt',(req,res)=>{
  selleronboardingModel.countDocuments().then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })   
})


router.get('/getActiveCnt',(req,res)=>{
  selleronboardingModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })  
})

router.get('/getInactiveCnt',(req,res)=>{
  selleronboardingModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
  res.send({"cnt":""+count_documents1}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
})

module.exports = router;
