const jwt = require('jsonwebtoken');
<<<<<<< HEAD
=======

>>>>>>> 561a4499d6046ff8f4431ec52a5403469da8399d
const checkLoginNew = async(req, res, next) => {
    try {
        // const token = req.cookies.authorization;
        const token = req.body.access_token;
        if (token === null || token === undefined) {
            res.status(402).json({
                status: 402,
                message: 'Token unavailable',
            });
            console.log('token:', token);
        } else {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            const { id, admin } = decode;
            req.id = id;
            req.admin = admin;
            next();
        }
    } catch {
        res.status(401).json({
            status: 401,
            message: 'Token unavailable',
        });
    }
<<<<<<< HEAD

=======
>>>>>>> 561a4499d6046ff8f4431ec52a5403469da8399d
};
module.exports = checkLoginNew;