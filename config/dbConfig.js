const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://niranjan_sit:zpBkKvShnBKxJOBn@leadgeneration.vkmeu.mongodb.net/leadgenerationdb",{
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error",(err)=>{
    console.log(`MongoDB Connection error: ${err}`)
})

module.exports=mongoose;