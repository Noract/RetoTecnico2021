
const classConsole = require('../helper/classLogs')
const zona = require("../models").tbl_zona;
const entrenador = require("../models").tbl_entrenador;

let create = async (nombre, apellido, edad, codigoImperial, religion) => {
    try {
        //se valida campos
        if (!nombre)
            return ("No se encontro el valor")
        if (!apellido)
            return ("No se encontro el valor")
        if (!codigoImperial)
            return ("No se encontro el valor")
        //se crea el entrenador
        let response = await entrenador.create({
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            codigoImperial: codigoImperial,
            religion: religion
        })
        classConsole.logDeveloper(response)
        return "Creado"
    }
    catch (error) {
        throw error
    }
}

let list = async () => {
    try {
        //condicionales para el endpoint limita, ordena por y organiza
        let response = await entrenador.findAll({
            include:
            {
                model: zona,
                as: "tbl_zona",
                where: {
                    activo: 1
                },
                required: false
            },
            where: {
                activo: 1
            }
        })
        classConsole.logDeveloper(response)
        return response

    } catch (error) {
        throw error
    }
}

let find = async (idEntrenador) => {
    try {
        //Busca un entrenador especifico
        let response = entrenador.findOne({
            include:
            {
                model: zona,
                as: "tbl_zona",
                where: {
                    activo: 1
                },
                required: false
            },
            where: {
                activo: 1,
                idEntrenador: idEntrenador
            }
        })
        return response
    } catch (error) {
        throw error
    }

}

let update = async (nombre, apellido, edad, codigoImperial, religion, idEntrenador) => {
    try {
        let query = {}
        //genera un arreglo con solo los campos que se requieren modificar, asi podemos editar solo el apellido, como todo los campos si el usuario gusta
        if (nombre !== undefined) {
            query["nombre"] = nombre
        }
        if (apellido !== undefined) {
            query["apellido"] = apellido
        }
        if (edad !== undefined) {
            query["edad"] = edad
        }
        if (codigoImperial !== undefined) {
            query["codigoImperial"] = codigoImperial
        }
        if (religion !== undefined) {
            query["religion"] = religion
        }
        console.log(query)
        //se modifica la informacion de la tabla tbl_entrenador
        await entrenador.update(
            query,
            {
                where:
                {
                    idEntrenador: idEntrenador
                }
            })
        return "Updated"
    } catch (error) {
        throw error
    }
}
let deleted = async (idEntrenador) => {
    //se cambia de estado al entrenador
    try {
        entrenador.update(
            { activo: 0 },
            {
                where:
                {
                    idEntrenador: idEntrenador
                }
            }
        )
        return "Deleted"
    } catch (error) {
        throw error
    }

}

module.exports = {
    create,
    update,
    find,
    list,
    deleted
}