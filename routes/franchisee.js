const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const router = express.Router();

const FranchiseeModel = require("../models/franchisee");

//Multer----------------------
const storage=multer.diskStorage({
  destination:function(req,file,cb){
     return cb(null,"./document/franchisee")
  },
  filename:function (req,file,cb) {
      const uniqueSuffix=`${Date.now()}_${file.originalname}`;
      return cb(null,uniqueSuffix);
  }
});

const upload =multer({storage: storage});

router.post("/createFranchisee", (req, res) => {
  FranchiseeModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllFranchisee", (req, res) => {
  FranchiseeModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleFranchisee/:id", (req, res) => {
  const id = req.params.id;
  FranchiseeModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleFranchisee/:id", (req, res) => {
  const id = req.params.id;
  FranchiseeModel.findByIdAndUpdate(
    { _id: id },
    {
      franchisee: req.body.franchisee,
      oname: req.body.oname,
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

router.delete("/deleteSingleFranchisee/:id", (req, res) => {
  const id = req.params.id;
  FranchiseeModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});


router.get('/getAllCnt',(req,res)=>{

  FranchiseeModel.countDocuments().then((count_documents) => {
  
    res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
 
})


router.get('/getActiveCnt',(req,res)=>{

  FranchiseeModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
  
    res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
 
})

router.get('/getInactiveCnt',(req,res)=>{

  FranchiseeModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
  
    res.send({"cnt":""+count_documents1}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
 
})


module.exports = router;
