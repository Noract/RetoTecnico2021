
const classConsole = require('../helper/classLogs')
const zona = require("../models").tbl_zona;
const entrenador = require("../models").tbl_entrenador;
const personaje = require("../models").tbl_personaje;
const swappi = require('../services/swappi.services')

let create = async (idEntrenador, idPlaneta) => {
    try {
        //se valida campos
        if (!idEntrenador)
            return ("No se encontro el valor")
        if (!idPlaneta)
            return ("No se encontro el valor")
        let _entrenador = await entrenador.findOne({ where: { activo: 1, idEntrenador: idEntrenador } })
        classConsole.logDeveloper(_entrenador)
        if (!_entrenador) return ("No se encontro el valor")
        //consulta api Swappi
        let swappis = await swappi.findPlanet(idPlaneta)
        classConsole.logDeveloper(swappis)
        if (swappis.length == 0) return ("No se encontro el planeta")
        let _swappis = swappis[0]
        //insert tabla zona
        let response = await zona.create({
            nombrePlaneta: _swappis.nombre,
            gravedad: _swappis.gravedad,
            idPlaneta: idPlaneta,
            idEntrenador: idEntrenador
        })
        classConsole.logDeveloper(response)
        return response
    }
    catch (error) {
        throw error
    }
}

let list = async () => {
    try {
        //condicionales para el endpoint limita, ordena por y organiza
        let response = await zona.findAll({
            include:
                [
                    {
                        model: entrenador,
                        as: "tbl_entrenador",
                        where: {
                            activo: 1
                        },
                        required: false
                    },
                    {
                        model: personaje,
                        as: "tbl_personaje",
                        through: {}
                    }
                ],
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

let find = async (idZona) => {
    try {
        //Busca un entrenador especifico
        let response = zona.findOne({
            include:
                [
                    {
                        model: entrenador,
                        as: "tbl_entrenador",
                        where: {
                            activo: 1
                        },
                        required: false
                    },
                    {
                        model: personaje,
                        as: "tbl_personaje",
                        through: {}
                    }
                ],
            where: {
                activo: 1,
                idZona: idZona
            }
        })
        return response
    } catch (error) {
        throw error
    }

}

let update = async (idZona, idEntrenador, idPlaneta) => {
    try {
        let query = {}
        //genera un arreglo con solo los campos que se requieren modificar, asi podemos editar solo el apellido, como todo los campos si el usuario gusta
        if (idEntrenador !== undefined) {
            let _entrenador = await entrenador.findOne({ where: { activo: 1, idEntrenador: idEntrenador } })
            classConsole.logDeveloper(_entrenador)
            if (!_entrenador) return ("No se encontro el valor")
            query["idEntrenador"] = idEntrenador
        }
        if (idPlaneta !== undefined) {
            //consulta api Swappi
            let swappis = await swappi.findPlanet(idPlaneta)
            classConsole.logDeveloper(swappis)
            if (swappis.length == 0) return ("No se encontro el planeta")
            query["idPlaneta"] = idPlaneta
        }
        //se modifica la informacion de la tabla tbl_entrenador
        await zona.update(
            query,
            {
                where:
                {
                    idZona: idZona
                }
            })
        return "Updated"
    } catch (error) {
        throw error
    }
}
let deleted = async (idZona) => {
    //se cambia de estado al entrenador
    try {
        zona.update(
            { activo: 0 },
            {
                where:
                {
                    idZona: idZona
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