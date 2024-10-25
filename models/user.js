const mongoose = require("../config/dbConfig");

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    mobileno:String,
    password: String,
    filename:String,
    filepath:String, 
    activeFlag: {type: String, enum:["1","0"],default:"0"},
    deleteFlag: {type: String, enum:["1","0"],default:"0"}
    
});


module.exports=mongoose.model("User",userSchema);