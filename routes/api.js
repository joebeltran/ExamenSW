var express= require('express');
var router = express.Router();

function initApi(db){
  var examenswRoutes = require('./api/incidentes')(db);
  router.use('/incidentes', examenswRoutes);
  return router;
}

module.exports = initApi;