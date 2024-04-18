const jwt = require("jsonwebtoken");

const AuthUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  let userId = jwt.verify(token, "jwt-secret-key")?.userId;
  req.user = userId;
  if (!token) {
    return res.json({
      status: false,
      message: "you're not logged in  please pass your token",
    });
  } else {
    next();
  }
};

module.exports = {
  AuthUser,
};
