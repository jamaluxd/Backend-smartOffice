const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const checkLogin = async (req, res, next) => {
  // const { authorization } = req.headers;
  const cookies = cookie.parse(req.headers.cookie);
  const auth = cookies.authorization;
  console.log(req.cookies);
  // const auth = req.cookies.authorization

  console.log(auth);

  try {
    // const token = authorization.split(" ")[1];
    const token = auth;
    // console.log(token);
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const { id, admin } = decode;
    req.id = id;
    req.admin = admin;
    console.log(id);
    next();
  } catch {
    next("Authentication failure!!! 404");
  }
};
module.exports = checkLogin;
