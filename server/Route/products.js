const express = require("express");
const Product = require("../Models/productModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { AuthUser } = require("../middleware/Auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
router.use("/profile", express.static("public"));

router.post("/create", AuthUser, upload.single("image"), async (req, res) => {
  const { title, description, price } = req.body;
  console.log(req?.file?.path);
  try {
    const createProduct = await Product.create({
      userId: req.user,
      title: title,
      description: description,
      price: price,
      profile_url: `${req?.file?.path}`,
    });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    return res.status(200).json({
      message: "product has been added successfully",
      status: true,
      // profile_url: `http://localhost:2000/public/uploads/${req?.file?.filename}`,
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(400).json({ err: error.message });
  }
});

// Get all products available
router.get("/getProducts", AuthUser, async (req, res) => {
  try {
    const getProducts = await Product.findAll({
      where: {
        userId: req.user,
      },
    });
    res.json({ getProducts });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/getProducts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getParticularProducts = await Product.findOne({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ msg: "Data Gotten Successfully", data: getParticularProducts });
  } catch (error) {}
});

// Delete one particular product bt id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Product.destroy({ where: { id: id } });
    return res.status(200).json({ message: "Product deleted Succesfully" });
  } catch (error) {
    res.status(400).json({ message: "User Not Found" });
  }
});

// Update one particular products by id
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateProduct = await Product.update(
      { ...req.body },
      { where: { id: id }, returning: true }
    );
    return res.json({ message: "Products Updated Successfully", status: true });
  } catch (error) {
    console.log(error?.message);
  }
});

module.exports = router;
