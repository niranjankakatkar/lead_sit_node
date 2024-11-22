const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const router = express.Router();

const MenuAssignModel = require("../models/menu_assign_master");


router.post("/createMenuAssign",  async (req, res) => {
 const role = req.body.role;
  const menu_id = req.body.menu_id;
  const link_id = req.body.link_id; 
  const sub_link_id = req.body.sub_link_id;
  MenuAssignModel.create({
    role: role,
    menu_id: menu_id,
    link_id: link_id,
    sub_link_id: sub_link_id,
    
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getAllMenuAssing", (req, res) => {
    MenuAssignModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});



module.exports = router;
