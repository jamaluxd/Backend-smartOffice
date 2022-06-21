const checkIsAdmin = (req, res, next) => {
  // console.log(req.admin);
  try {
    if (req.admin == true) {
      next();
    } else {
      next("Authentication failure!!!");
    }
  } catch {
    next("Authentication failure!!!");
  }
};
module.exports = checkIsAdmin;
