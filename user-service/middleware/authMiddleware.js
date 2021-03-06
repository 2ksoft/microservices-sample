const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'hanh-test', (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          statusCode: 400,
          messageCode: "api.error.auth",
          message: "Unauthorized",
          result: "Token is invaid"
        });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({
      statusCode: 400,
      messageCode: "api.error.auth",
      message: "Unauthorized",
      result: "Token not exists !"
    });
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (token) {
    jwt.verify(token, 'hanh-test', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id).select("-password");
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = {
  requireAuth,
  checkUser
};