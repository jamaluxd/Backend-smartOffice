const checkIsAdmin = (req, res, next) => {
 console.log(req.body);
  try {
    if (_isAdmin==1) {
      next();
    } else {
      next("Authentication failure!!!");
    }
  } catch {
    next("Authentication failure!!!");
  }

};
module.exports = checkIsAdmin;
