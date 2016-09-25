const jwt = require('jwt-simple');
const models = require('../models');

const errorResponse = { validated: false };
module.exports = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      if (!decoded || decoded.expires <= Date.now()) {
        return res.json(errorResponse);
      }
      const user = await models.User.findOne({ where: { id: decoded.id } });
      if (user) {
        req.user = user;
        return next();
      }
      return res.json(errorResponse);
    } catch (e) {
      return res.json(errorResponse);
    }
  } else {
    return res.json(errorResponse);
  }
};
