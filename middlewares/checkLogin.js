const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = decode;
    req.email = email;
    req.id = id;
    next();
  } catch {
    next("Authentication failure!!!");
  }
};
module.exports = checkLogin;
