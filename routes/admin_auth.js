const express = require("express");
const cors = require("cors");
const app = express();

const router = express.Router();

const authModel=require("../models/admin_auth");



router.post('/createAdminAuth',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    authModel.create({username:username,password:password})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})



module.exports = router;
