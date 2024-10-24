const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser= require("body-parser");

const userAPI= require("./routes/user");
const franchaiseRoute= require("./routes/franchisee");

app.use(bodyParser.json());
app.use(cors());

app.use("/user",userAPI);
app.use("/franchisee", franchaiseRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on : htpp://localhost:${PORT}`);
})
