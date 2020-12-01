module.exports = (app) => {
  app.get('/auth', (req, res) => {
    res.send('Authentication service is healthy ');
  });
};
