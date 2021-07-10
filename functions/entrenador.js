require('dotenv').config()
var AWS = require("aws-sdk"); // must be npm installed to use
const classConsole = require('../helper/classLogs')
const entrenador = require("../controller/tbl_entrenador.controller");
module.exports.trainer = async (event, context, callback) => {
  try {
    const statusCode = 200;
    let response, result;
    console.log(event)
    if (event.httpMethod === 'GET' && event.pathParameters) {
      let { idEntrenador } = event.pathParameters;
      result = await entrenador.find(idEntrenador)
      classConsole.logSuccess(result)
    }
    else if (event.httpMethod === "GET") {
      result = await entrenador.list()
      classConsole.logSuccess(result)
    }
    else if (event.httpMethod === 'POST') {
      let { nombre, apellido, edad, codigoImperial, religion } = JSON.parse(event.body)
      result = await entrenador.create(nombre, apellido, edad, codigoImperial, religion)
      classConsole.logSuccess(result)
    }
    else if (event.httpMethod === 'PUT') {
      let { idEntrenador } = event.pathParameters;
      let { nombre, apellido, edad, codigoImperial, religion } = JSON.parse(event.body);
      console.log(nombre, apellido, edad, codigoImperial, religion, idEntrenador)
      result = await entrenador.update(nombre, apellido, edad, codigoImperial, religion, idEntrenador)
      classConsole.logSuccess(result)
    }
    else if (event.httpMethod === 'DELETE') {
      let { idEntrenador } = event.pathParameters;
      result = await entrenador.deleted(idEntrenador)
      classConsole.logSuccess(result)
    }
    response = {
      "statusCode": statusCode,
      "headers": {
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      "body": JSON.stringify(result),
      "isBase64Encoded": false
    };
    classConsole.logSuccess(response)
    callback(null, response);
  }
  catch (error) {
    let response = {
      statusCode: '400',
      body: JSON.stringify({ error: error }),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    classConsole.logError(response)
    context.succeed(response);
  }
};
