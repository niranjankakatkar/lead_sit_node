const express = require("express");
const cors = require("cors");
const app = express();

const router = express.Router();

const authModel=require("../models/authontication");



router.post('/createAuth',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const post=req.body.post;
    const loginID=req.body.loginID;
    authModel.create({name:name,email:email,password:password,post:post,loginID:loginID})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})



module.exports = router;
