const mongoose = require("../config/dbConfig");

const authSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String,
    post:String,
    loginID:String,
    activeFlag: {type: String, enum:["1","0"],default:"1"},
    deleteFlag: {type: String, enum:["1","0"],default:"0"},  
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
    
});

module.exports=mongoose.model("authontication",authSchema);