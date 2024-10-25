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
    .populate("module") // This will replace the ObjectId with the module document
    .then((categories) => {
      // Prepare a response with category details and module names
      const result = categories.map((category) => ({
        _id: category._id,
        category: category.category,
        module: category.module ? category.module.module : null, // Access the module name
        activeFlag: category.activeFlag,
        deleteFlag: category.deleteFlag,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }));
      res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/getCategoriesByModule/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;
  CategoryModel.find({ module: moduleId })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
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

router.get('/getAllCnt',(req,res)=>{
  CategoryModel.countDocuments().then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })   
})


router.get('/getActiveCnt',(req,res)=>{
  CategoryModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
  res.send({"cnt":""+count_documents}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })  
})

router.get('/getInactiveCnt',(req,res)=>{
  CategoryModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
  res.send({"cnt":""+count_documents1}) 
  }).catch((err) => {
      res.send({"error":""+err}) 
  })
})


module.exports = router;
