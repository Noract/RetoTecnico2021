require('dotenv').config()
var AWS = require("aws-sdk"); // must be npm installed to use
const classConsole = require('../helper/classLogs')
const zonaPersonaje = require("../controller/tbl_zona_personaje.controller");
module.exports.zoneCharacter = async (event, context, callback) => {
    try {
        const statusCode = 200;
        let response, result;
        if (event.httpMethod === 'POST') {
            let { idZona, idPersonaje, dias, horas } = JSON.parse(event.body)
            result = await zonaPersonaje.create(idZona, idPersonaje, dias, horas)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'PUT') {
            let { id } = event.pathParameters;
            let { idZona, idPersonaje, dias, horas } = JSON.parse(event.body);
            result = await zonaPersonaje.update(id, idZona, idPersonaje, dias, horas)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'DELETE') {
            let { id } = event.pathParameters;
            result = await zonaPersonaje.deleted(id)
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
