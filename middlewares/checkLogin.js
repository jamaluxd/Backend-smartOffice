const jwt = require("jsonwebtoken");
const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const { id, admin } = decode;
    req.id = id;
    req.admin = admin;
    next();
  } catch {
    next("Authentication failure!!!");
  }
};
module.exports = checkLogin;
