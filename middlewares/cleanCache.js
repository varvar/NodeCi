const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // Let the route handler to run first, complete the task then come back here to clear the cache
  await next();

  clearHash(req.user.id);
};
