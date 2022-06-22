const jwt = require("jsonwebtoken");
const cookie = require("cookie")
const checkLogin = async (req, res, next) => {
  // const { authorization } = req.headers;
  const cookies = cookie.parse(req.headers.cookie);
  const auth  = cookies.authorization;
  try {
    // const token = authorization.split(" ")[1];
    const token = auth;
    console.log(token);
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
