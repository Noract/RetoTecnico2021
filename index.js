require('dotenv').config()
const entrenador = require("./controller/tbl_entrenador.controller");
const zona = require("./controller/tbl_zona.controller");
const personaje = require("./controller/tbl_personaje.controller");
const zonaPersonaje = require("./controller/tbl_zona_personaje.controller");
const swaggerUi = require('swagger-ui-express'),
   swaggerDocument = require('./swagger.json')
const serverless = require('serverless-http')
const express = require('express');
const app = express();
const classConsole = require('./helper/classLogs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/entrenador', async (req, res) => {
   try {
      let response, result;
      let { nombre, apellido, edad, codigoImperial, religion } = req.body;
      //se valida campos
      if (!nombre)
         res.status(404).send("No se encontro el valor")
      if (!apellido)
         res.status(404).send("No se encontro el valor")
      if (!codigoImperial)
         res.status(404).send("No se encontro el valor")
      result = await entrenador.create(nombre, apellido, edad, codigoImperial, religion)
      res.send({
         status: 200,
         success: true,
         body: result
      });

   } catch (error) {
      console.log(error)
   }
})
app.get('/entrenador', async (req, res) => {
   let response, result;
   let { limit, orderBy, sort } = req.query;
   //se valida campos
   limit = parseInt(limit) || null;
   orderBy = orderBy || "idEntrenador";
   sort = sort || "asc";
   result = await entrenador.list(limit, orderBy, sort)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.get('/entrenador/:idEntrenador', async (req, res) => {
   let response, result;
   let { idEntrenador } = req.params;
   console.log(idEntrenador)
   result = await entrenador.find(idEntrenador)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.put('/entrenador/:idEntrenador', async (req, res) => {
   let response, result;
   let { idEntrenador } = req.params;
   let { nombre, apellido, edad, codigoImperial, religion } = req.body;
   result = await entrenador.update(nombre, apellido, edad, codigoImperial, religion, idEntrenador)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.delete('/entrenador/:idEntrenador', async (req, res) => {
   let response, result;
   let { idEntrenador } = req.params;
   result = await entrenador.deleted(idEntrenador)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})

app.post('/zona', async (req, res) => {
   try {
      let response, result;
      let { idEntrenador, idPlaneta } = req.body;
      //se valida campos
      if (!idPlaneta)
         res.status(404).send("No se encontro el valor")
      if (!idEntrenador)
         res.status(404).send("No se encontro el valor")
      result = await zona.create(idEntrenador, idPlaneta)
      res.send({
         status: 200,
         success: true,
         body: result
      });

   } catch (error) {
      console.log(error)
   }
})
app.get('/zona', async (req, res) => {
   let response, result;
   let { limit, orderBy, sort } = req.query;
   //se valida campos
   limit = parseInt(limit) || null;
   orderBy = orderBy || "idZona";
   sort = sort || "asc";
   result = await zona.list(limit, orderBy, sort)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.get('/zona/:idZona', async (req, res) => {
   let response, result;
   let { idZona } = req.params;
   result = await zona.find(idZona)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.put('/zona/:idZona', async (req, res) => {
   let response, result;
   let { idZona } = req.params;
   let { idEntrenador, idPlaneta } = req.body;
   result = await zona.update(idZona, idEntrenador, idPlaneta)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.delete('/zona/:idZona', async (req, res) => {
   let response, result;
   let { idZona } = req.params;
   result = await zona.deleted(idZona)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})

app.post('/personaje', async (req, res) => {
   try {
      let response, result;
      let { idSwappi } = req.body;
      //valida campos
      if (!idSwappi)
         res.status(404).send("No se encontro el valor")
      result = await personaje.create(idSwappi)
      res.send({
         status: 200,
         success: true,
         body: result
      });

   } catch (error) {
      console.log(error)
   }
})
app.get('/personaje', async (req, res) => {
   let response, result;
   let { limit, orderBy, sort } = req.query;
   //se valida campos
   limit = parseInt(limit) || null;
   orderBy = orderBy || "idPersonaje";
   sort = sort || "asc";
   result = await personaje.list(limit, orderBy, sort)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.get('/personaje/:idPersonaje', async (req, res) => {
   let response, result;
   let { idPersonaje } = req.params;
   result = await personaje.find(idPersonaje)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.put('/personaje/:idPersonaje', async (req, res) => {
   let response, result;
   let { idPersonaje } = req.params;
   let { idSwappi } = req.body;
   result = await personaje.update(idPersonaje, idSwappi)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.delete('/personaje/:idPersonaje', async (req, res) => {
   let response, result;
   let { idPersonaje } = req.params;
   result = await personaje.deleted(idPersonaje)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})

app.post('/zona_personaje', async (req, res) => {
   try {
      let response, result;
      let { idZona, idPersonaje, dias, horas } = req.body;
      result = await zonaPersonaje.create(idZona, idPersonaje, dias, horas)
      res.send({
         status: 200,
         success: true,
         body: result
      });

   } catch (error) {
      console.log(error)
   }
})
app.put('/zona_personaje/:id', async (req, res) => {
   let response, result;
   let { id } = req.params;
   let { idZona, idPersonaje, dias, horas } = req.body;
   result = await zonaPersonaje.update(id, idZona, idPersonaje, dias, horas)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.delete('/zona_personaje/:id', async (req, res) => {
   let response, result;
   let { id } = req.params;
   result = await zonaPersonaje.deleted(id)
   res.send({
      status: 200,
      success: true,
      body: result
   });
})
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var server = app.listen(3000);
module.exports = server
// wrap express app instance with serverless http function
module.exports.handler = serverless(app)



