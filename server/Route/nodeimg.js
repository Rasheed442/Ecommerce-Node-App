const multer = require("multer");
const express = require("express");
const router = express.Router();
const path = require("path");

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

router.post("/upload", upload.single("image"), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Handle the uploaded file
  res.json({
    msg: "File uploaded successfully",
    profile_url: `http://localhost:2000/public/uploads/${req.file.filename}`,
  });
});

router.get("/getupload", (req, res) => {
  // Implement logic to get uploaded files if needed
  res.send("Get upload logic goes here");
});

module.exports = router;
