const jwt = require('jwt-simple');
const models = require('../models');

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      if (decoded.expires <= Date.now()) {
        return res.end('Access token has expired', 400);
      }
      models.User.findOne({ id: decoded.id })
        .then((user) => {
          if (user) {
            req.user = user;
            return next();
          } else {
            return res.sendStatus(401);
          }
        });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};