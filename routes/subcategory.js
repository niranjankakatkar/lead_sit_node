const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const router = express.Router();

const SubcategoryModel = require("../models/subcategory");

//Multer----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./document/subcategory");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    return cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createSubcategoryImg",
  upload.single("file"),
  async (req, res) => {
    const { subcategory, categoryId, moduleId } = req.body; // Retrieve from form data
    const { path, filename } = req.file;

    try {
      const newSubcategory = await SubcategoryModel.create({
        subcategory,
        categoryId,
        moduleId,
        filename,
        filepath: path,
        activeFlag: "1",
        deleteFlag: "0",
      });
      res.json(newSubcategory);
    } catch (err) {
      console.error("Error saving subcategory:", err);
      res.status(500).json({ error: "Error saving subcategory" });
    }
  }
);

router.post("/createSubcategory", (req, res) => {
  SubcategoryModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getSubcategoriesByCategory/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  SubcategoryModel.find({ categoryId: categoryId }) // Updated to `moduleID`
    .then((categories) => {
      if (categories.length === 0) {
        return res
          .status(404)
          .json({ message: "No categories found for this module ID" });
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

router.get("/getAllSubcategory", (req, res) => {
  SubcategoryModel.find()
    .populate("category")
    .populate("module")
    .then((subcategories) => {
      const result = subcategories.map((subcategory) => ({
        _id: subcategory._id,
        subcategory: subcategory.subcategory,
        category: subcategory.category ? subcategory.category.category : null, // Access the category name
        module: subcategory.module ? subcategory.module.module : null, // Access the module name
        activeFlag: subcategory.activeFlag,
        deleteFlag: subcategory.deleteFlag,
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
      }));
      res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/getSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.put("/updateSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findByIdAndUpdate(
    { _id: id },
    {
      category: req.body.category,
      module: req.body.module,
      activeFlag: req.body.activeFlag,
      deleteFlag: req.body.deleteFlag,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteSingleSubcategory/:id", (req, res) => {
  const id = req.params.id;
  SubcategoryModel.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

router.get("/getAllCnt", (req, res) => {
  SubcategoryModel.countDocuments()
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getActiveCnt", (req, res) => {
  SubcategoryModel.countDocuments({ activeFlag: 1 }, {})
    .then((count_documents) => {
      res.send({ cnt: "" + count_documents });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

router.get("/getInactiveCnt", (req, res) => {
  SubcategoryModel.countDocuments({ activeFlag: 0 }, {})
    .then((count_documents1) => {
      res.send({ cnt: "" + count_documents1 });
    })
    .catch((err) => {
      res.send({ error: "" + err });
    });
});

module.exports = router;
