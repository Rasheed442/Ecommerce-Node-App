const express = require("express");
const Auth = require("../Models/authenticationModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please input all fields" });
  }
  const hashedpassword = await bcrypt.hash(password.toString(), 10);
  try {
    Auth.create({
      username,
      email,
      password: hashedpassword,
    });
    return res.status(200).json({
      username: username,
      message: "User created Successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userdata = await Auth.findOne({ where: { email: email } });
    const userId = userdata?.userId;
    console.log("myconsole", userId);
    const token = jwt.sign({ userId }, "jwt-secret-key", {
      expiresIn: "1d",
    });
    if (!userdata) {
      return res.status(400).json({ message: "Invalid Credentials" });
      3;
    }
    const userpass = await bcrypt?.compare(password, userdata.password);

    if (!userpass) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    return res.status(200).json({
      status: true,
      username: userdata.username,
      message: "logged In Successfully",
      token: token,
      id: userdata.userId,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/getAllRegisteredUsers", async (req, res) => {
  const RegisteredUsers = await Auth.findAll();
  try {
    return res
      .status(200)
      .json({ msg: "User Registered Successfully", Users: RegisteredUsers });
  } catch (error) {
    res.status(400).json({ err: error?.message });
  }
});

router.get("/getAllRegisteredUsers/:id", async (req, res) => {
  const id = req.params.id;
  const Users = await Auth.findOne({
    where: {
      userId: id,
    },
  });
  try {
    return res.status(200).json({ msg: "Gotten User By Id", user: Users });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
