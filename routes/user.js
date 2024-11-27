const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const UserModel=require("../models/user");

//Multer----------------------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
       return cb(null,"./document/users")
    },
    filename:function (req,file,cb) {
        const uniqueSuffix=`${Date.now()}_${file.originalname}`;
        return cb(null,uniqueSuffix);
    }
});

const upload =multer({storage: storage});

router.post("/uploadimg",upload.single("file"),async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    
})

router.post('/createUserImg',upload.single("file"),async(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobileno=req.body.mobileno;
    const password=req.body.password;
    const {path,filename}=req.file;
    
    UserModel.create({name:name,email:email,mobileno:mobileno,password:password,filepath:path,filename: filename})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post('/createUser',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobileno=req.body.mobileno;
    const password=req.body.password;
    const path="";
    const filename="";
    
    UserModel.create({name:name,email:email,mobileno:mobileno,password:password,filepath:path,filename: filename})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/editUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findOneAndUpdate({ _id: id})
    .then(post=>res.json(post))
    .catch(err=>res.json(err))
})

router.post('/editUser/:id',(req,res)=>{
   
    const name=req.body.name;
    const email=req.body.email;
    const mobileno=req.body.mobileno;
   
    UserModel.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name: name,
            email: email,
            mobileno: mobileno
        }
    })
    .then(users=>res.json({status:"ok",date:"updated"}))
    .catch(err=>res.json(err))
})

router.get('/getAllUser',(req,res)=>{
    UserModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/getImageUser/:id',(req,res)=>{
    const id=req.params.id
    try {
       const file= UserModel.findById({ _id: id});
       if(!image) res.send({"msg":"Image Not Found"})

        const filepath=path.join(__dirname,"../document/users",image.filename);
        res.sendFile(filepath);
    } catch (error) {
        res.send({"error":"Image Not Found"+error}) 
    }
   
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

router.get('/getAllCnt',(req,res)=>{
    UserModel.countDocuments().then((count_documents) => {
    res.send({"cnt":""+count_documents}) 
    }).catch((err) => {
        res.send({"error":""+err}) 
    })   
})


router.get('/getActiveCnt',(req,res)=>{
    UserModel.countDocuments({activeFlag:1},{}).then((count_documents) => {
    res.send({"cnt":""+count_documents}) 
    }).catch((err) => {
        res.send({"error":""+err}) 
    })  
})

router.get('/getInactiveCnt',(req,res)=>{
    UserModel.countDocuments({activeFlag:0},{}).then((count_documents1) => {
    res.send({"cnt":""+count_documents1}) 
    }).catch((err) => {
        res.send({"error":""+err}) 
    })
})



module.exports = router;
