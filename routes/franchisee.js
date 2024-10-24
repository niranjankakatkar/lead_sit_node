const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const UserModel=require("../models/user");

router.post('/createUser',(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/getAllUser',(req,res)=>{
    UserModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//router.post("/register",signupController.createUser);

router.get('/getSingleUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findById({ _id: id})
    .then(post=>res.json(post))
    .catch(err=>res.json(err))
})

router.put('/updateSingleUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findByIdAndUpdate({ _id: id},{
        name: req.body.name,
        email: req.body.email,
        mobileno: req.body.mobileno,
        password: req.body.password,
        activeFlag: req.body.activeFlag,
        deleteFlag: req.body.deleteFlag
    }).then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.delete('/deleteSingleUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findByIdAndDelete({ _id: id})
    .then(post=>res.json(post))
    .catch(err=>res.json(err))
})


module.exports = router;
