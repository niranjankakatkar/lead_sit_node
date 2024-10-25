const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const EmployeeModel = require("../models/employee");

router.post("/createEmployee", (req, res) => {
  EmployeeModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllEmployee", (req, res) => {
  EmployeeModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleEmployee/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleEmployee/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndUpdate(
    { _id: id },
    {
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
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

router.delete("/deleteSingleEmployee/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get('/getAllCnt',(req,res)=>{
  EmployeeModel.countDocuments().then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })   
})


router.get('/getActiveCnt',(req,res)=>{
  EmployeeModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })  
})

router.get('/getInactiveCnt',(req,res)=>{
  EmployeeModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
  res.send({"cnt":""+count_documents1}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
})

module.exports = router;
