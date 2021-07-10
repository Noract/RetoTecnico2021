require('dotenv').config()
var AWS = require("aws-sdk"); // must be npm installed to use
const classConsole = require('../helper/classLogs')
const swappi = require("../services/swappi.services");
module.exports.swappi = async (event, context, callback) => {
    try {
        const statusCode = 200;
        let response, result;
        console.log(event)
        if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/people/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findPeople(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/planet/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findPlanet(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/film/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findFilms(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/starShip/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findStarShip(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/vehicle/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findVehicules(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === 'GET' && event.pathParameters && event.resource === '/v1/species/{id}') {
            let { id } = event.pathParameters;
            result = await swappi.findSpecies(id)
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === "GET" && event.resource === '/v1/people') {
            result = await swappi.getPeople()
            classConsole.logSuccess(result)
        }
        else if (event.httpMethod === "GET" && event.resource === '/v1/planet') {
            result = await swappi.getPlanet()
            classConsole.logSuccess(result)
        }

        else if (event.httpMethod === "GET" && event.resource === '/v1/film') {
            result = await swappi.getFilms()
            classConsole.logSuccess(result)
        }

        else if (event.httpMethod === "GET" && event.resource === '/v1/starShip') {
            result = await swappi.getStarShip()
            classConsole.logSuccess(result)
        }

        else if (event.httpMethod === "GET" && event.resource === '/v1/vehicle') {
            result = await swappi.getVehicules()
            classConsole.logSuccess(result)
        }

        else if (event.httpMethod === "GET" && event.resource === '/v1/species') {
            result = await swappi.getSpecies()
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
    console.log(error)
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
