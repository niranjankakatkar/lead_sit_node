const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser= require("body-parser");

const admin_authAPI= require("./routes/admin_auth");
const authAPI= require("./routes/authontication");
const userAPI= require("./routes/user");
const franchaiseAPI = require("./routes/franchisee");
const employeeAPI = require("./routes/employee");
const moduleAPI = require("./routes/module");
const categoryAPI = require("./routes/category");
const subcategoryAPI = require("./routes/subcategory");
const selleronboardAPI = require("./routes/selleronboarding");
const merchantonboardAPI = require("./routes/merchantonboarding");


const path=require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./document"))

app.use("/admin",admin_authAPI);
app.use("/auth",authAPI);
app.use("/user",userAPI);
app.use("/franchisee", franchaiseAPI);
app.use("/employee", employeeAPI);
app.use("/module", moduleAPI);
app.use("/category", categoryAPI);
app.use("/subcategory", subcategoryAPI);
app.use("/selleronboarding", selleronboardAPI);
app.use("/merchantonboarding", merchantonboardAPI);

const authModel=require("./models/authontication");
const admin_authModel=require("./models/admin_auth");

app.post("/auth/login",(req,res)=>{
    const{email,password}=req.body;
    authModel.findOne({email:email})
    .then(user=>{
        console.log(user);
        if(user){
            if(user.password===password){
                res.send({"msg":"1","id":""+user._id+"","loginID":""+user.loginID,"post":""+user.post}) 
            }else{
                res.send({"msg":"0"}) 
            }
        }else{
            res.send({"msg":""}) 
        }
    })
})

app.post("/admin/admin_auth",(req,res)=>{
    const{username,password}=req.body;
    admin_authModel.findOne({username:username})
    .then(user=>{
        console.log(user);
        if(user){
            if(user.password===password){
                res.send({"msg":"1","id":""+user._id+"","loginID":""+user.loginID,"post":""+user.post}) 
            }else{
                res.send({"msg":"0"}) 
            }
        }else{
            res.send({"msg":""}) 
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on : htpp://localhost:${PORT}`);
})
