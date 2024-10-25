const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser= require("body-parser");

const userAPI= require("./routes/user");
const franchaiseAPI = require("./routes/franchisee");
const employeeAPI = require("./routes/employee");
const moduleAPI = require("./routes/module");
const categoryAPI = require("./routes/category");
const subcategoryAPI = require("./routes/subcategory");

const path=require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./document"))

app.use("/user",userAPI);
app.use("/franchisee", franchaiseAPI);
app.use("/employee", employeeAPI);
app.use("/module", moduleAPI);
app.use("/category", categoryAPI);
app.use("/subcategory", subcategoryAPI);



app.listen(PORT,()=>{
    console.log(`Server is running on : htpp://localhost:${PORT}`);
})
