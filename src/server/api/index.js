module.exports = (server) => {
  require('./auth')(server);
  require('./journey')(server);
  require('./leg')(server);
  require('./user')(server);
};
