var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function initexamensw(db) {
  var examenswColl = db.collection('examensw');
  router.get('/', (req, res, next)=>{
    examenswColl.find().toArray((err, examensw)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraer los Incidentes de la base de datos"});
      }
      return res.status(200).json(examensw);
    });

});
router.get('/:id', (req, res, next)=>{
  var id = new ObjectID(req.params.id);
  examenswColl.findOne({"_id": id} , (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"No se Logro Obtener, Intente Nuevamente"});
    }
    return res.status(200).json(doc);
  });
});

router.post('/', (req, res, next)=>{
    var newExamensw = Object.assign(
      {},
      {
        "descripcion":"",
        "fechahora": new Date().getTime(),
        "tipo":"",
        "estado":"",
        "usuarioregistra":"",
        "usuariorasignado":"",
        "fechahoraasig": new Date().getTime(),
        "fechahoraclose": new Date().getTime()
      },
      req.body
    );
    examenswColl.insertOne(newExamensw, (err, rslt)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No Agregado"});
      }
      if(rslt.ops.length===0){
        console.log(rslt);
        return res.status(404).json({ "error": "No Agregado" });
      }
      return res.status(200).json(rslt.ops[0]);
    });
  });

  return router;
}

module.exports = initexamensw;
