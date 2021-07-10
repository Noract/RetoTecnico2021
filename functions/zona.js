require('dotenv').config()
var AWS = require("aws-sdk"); // must be npm installed to use
const classConsole = require('../helper/classLogs')
const Zona = require("../controller/tbl_zona.controller");
module.exports.zone = async (event, context, callback) => {
    try {
        const statusCode = 200;
        let response, result;
        if (event.httpMethod === 'GET' && event.pathParameters) {
            let { idZona } = event.pathParameters;
            result = await Zona.find(idZona)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === "GET") {
            result = await Zona.list()
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'POST') {
            let { idEntrenador, idPlaneta } = JSON.parse(event.body)
            result = await Zona.create(idEntrenador, idPlaneta)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'PUT') {
            let { idZona } = event.pathParameters;
            let { idEntrenador, idPlaneta } = JSON.parse(event.body);
            result = await Zona.update(idEntrenador, idPlaneta, idZona)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'DELETE') {
            let { idZona } = event.pathParameters;
            result = await Zona.deleted(idZona)
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
