const express = require("express");
const cors = require("cors");
const authenticate = require("./Route/registration");
const products = require("./Route/products");
const nodeimg = require("./Route/nodeimg");
const app = express();
const db = require("./db");
const path = require("path");

app.use(express.json());
app.use(cors());

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);
app.use("/auth", authenticate);
app.use("/products", products);
app.use("/images", nodeimg);

const port = 2000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(2000, () => {
  db.authenticate()
    .then(() => {
      console.log(
        `Database connected ....... & server ruuning on Port:${port}`
      );
    })
    .catch((err) => console.log("Unable to connect to database", err));
});
