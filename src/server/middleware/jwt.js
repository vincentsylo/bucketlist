const jwt = require('jwt-simple');
const models = require('../models');

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.json({ validated: false });
      } else {
        if (decoded.expires <= Date.now()) {
          return res.json({ validated: false });
        }
        models.User.findOne({ id: decoded.id })
          .then((user) => {
            if (user) {
              req.user = user;
              return next();
            } else {
              return res.json({ validated: false });
            }
          });
      }
    } catch(e) {
      return res.json({ validated: false });
    }
  } else {
    return res.json({ validated: false });
  }
};