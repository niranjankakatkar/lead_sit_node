const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const router = express.Router();

const ServiceModel = require("../models/service");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/service");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    return cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/createServiceImg", upload.single("file"), async (req, res) => {
  const { service, moduleId, categoryId, subcategoryId } = req.body;
  const { path, filename } = req.file;

  ServiceModel.create({
    service,
    moduleId,
    categoryId,
    subcategoryId,
    filepath: path,
    filename,
  })
    .then((service) => res.json(service))
    .catch((err) => res.json(err));
});

//web
router.get("/getServicesBySubcategory/:subcategoryId", (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  ServiceModel.find({ subcategoryId: subcategoryId })
    .then((categories) => {
      if (categories.length === 0) {
        return res
          .status(404)
          .json({ message: "No Subcategories found for this module ID" });
      }
      res.json(categories);
    })
    .catch((err) =>
      res.status(500).json({
        error: "An error occurred while fetching categories",
        details: err,
      })
    );
});

//web
router.get("/getServicesByCategory/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  ServiceModel.find({ categoryId: categoryId })
    .then((categories) => {
      if (categories.length === 0) {
        return res
          .status(404)
          .json({ message: "No Subcategories found for this module ID" });
      }
      res.json(categories);
    })
    .catch((err) =>
      res.status(500).json({
        error: "An error occurred while fetching categories",
        details: err,
      })
    );
});

router.post("/createService", (req, res) => {
  ServiceModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Backend route to fetch subcategories based on category ID
router.get("/getSubcategoriesByCategory/:categoryId", (req, res) => {
  const { categoryId } = req.params;

  SubcategoryModel.find({ categoryId }) // Fetches subcategories by categoryId
    .then((subcategories) => {
      if (subcategories.length > 0) {
        res.json(subcategories);
      } else {
        res
          .status(404)
          .json({ message: "No subcategories found for this category." });
      }
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/getAllService", (req, res) => {
  ServiceModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSingleService/:id", (req, res) => {
  const id = req.params.id;
  ServiceModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleService/:id", (req, res) => {
  const id = req.params.id;
  ServiceModel.findByIdAndUpdate(
    { _id: id },
    {
      service: req.body.service,
      category: req.body.category,
      subcategory: req.body.subcategory,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleService/:id", (req, res) => {
  const id = req.params.id;
  ServiceModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  ServiceModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  ServiceModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  ServiceModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
