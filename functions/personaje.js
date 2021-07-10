require('dotenv').config()
var AWS = require("aws-sdk"); // must be npm installed to use
const classConsole = require('../helper/classLogs')
const Zona = require("../controller/tbl_personaje.controller");
module.exports.character = async (event, context, callback) => {
    try {
        const statusCode = 200;
        let response, result;
        if (event.httpMethod === 'GET' && event.pathParameters) {
            let { idPersonaje } = event.pathParameters;
            result = await Zona.find(idPersonaje)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === "GET") {
            result = await Zona.list()
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'POST') {
            let { idSwappi } = JSON.parse(event.body)
            result = await Zona.create(idSwappi)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'PUT') {
            let { idPersonaje } = event.pathParameters;
            let { idSwappi } = JSON.parse(event.body);
            result = await Zona.update(idPersonaje, idSwappi)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'DELETE') {
            let { idPersonaje } = event.pathParameters;
            result = await Zona.deleted(idPersonaje)
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
