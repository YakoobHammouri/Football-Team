// handle client and server errors
const path = require('path');
const error404 = (req, res) => {
  res.status(404).send('Page Not  : 404');
};

const error500 = (err, req, res, next) => {
  res.status(500).send('Server Error : 500');
};

module.exports = { error404, error500 };
