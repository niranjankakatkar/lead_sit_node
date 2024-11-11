const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const router = express.Router();

const ServiceLead = require("../models/serviceleaddetails");

// Middleware
app.use(cors());
app.use(express.json());

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./document/serviceleadproduct");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Route to Get All Categories
router.get("/getAllServiceLead", (req, res) => {
  ServiceLead.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err));
});

router.post(
  "/createServiceLead",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
    { name: "documentFile", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      serviceId,
      imagetitle,
      imagedescription,
      videotitle,
      videodescription,
      documenttitle,
      documentdescription,
      howitworks,
      tandc,
      faqs,
      activeFlag,
      deleteFlag,
    } = req.body;

    // Validate required fields
    if (!serviceId || !imagetitle || !videotitle || !documenttitle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the new category object
    const newCategory = {
      serviceId,
      imagetitle,
      imagedescription,
      videotitle,
      videodescription,
      documenttitle,
      documentdescription,
      howitworks,
      tandc,
      faqs,
      activeFlag,
      deleteFlag,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Handling file data from multer
    if (req.files.imageFile) {
      newCategory.imagefilename = req.files.imageFile[0].filename;
      newCategory.imagefilepath = req.files.imageFile[0].path;
    } else {
      return res.status(400).json({ error: "Image file is required" });
    }

    if (req.files.videoFile) {
      newCategory.videofilename = req.files.videoFile[0].filename;
      newCategory.videofilepath = req.files.videoFile[0].path;
    } else {
      return res.status(400).json({ error: "Video file is required" });
    }

    if (req.files.documentFile) {
      newCategory.documentfilename = req.files.documentFile[0].filename;
      newCategory.documentfilepath = req.files.documentFile[0].path;
    } else {
      return res.status(400).json({ error: "Document file is required" });
    }

    // Saving the new category
    try {
      const category = await ServiceLead.create(newCategory);
      res.json(category);
    } catch (err) {
      console.error("Error saving service lead:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/getServiceleadByServices/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;

  ServiceLead.find({ serviceId: serviceId })
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

// Update Category
router.put("/updateCategory/:id", (req, res) => {
  const categoryId = req.params.id;
  const updatedData = req.body;

  ServiceLead.findByIdAndUpdate(categoryId, updatedData, { new: true })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Soft Delete Category
router.delete("/deleteCategory/:id", (req, res) => {
  const categoryId = req.params.id;

  ServiceLead.findByIdAndUpdate(categoryId, { deleteFlag: "1" }, { new: true })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
