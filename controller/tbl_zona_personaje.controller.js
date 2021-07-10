
const classConsole = require('../helper/classLogs')
const zona = require("../models").tbl_zona;
const personaje = require("../models").tbl_personaje;
const zona_personaje = require("../models").tbl_zona_personaje;
const swappi = require('../services/swappi.services')

let create = async (idZona, idPersonaje, dias, horas) => {
    try {
        //se valida campos
        if (!idZona)
            return ("No se encontro el valor")
        if (!idPersonaje)
            return ("No se encontro el valor")
        if (!dias)
            return ("No se encontro el valor")
        if (!horas)
            return ("No se encontro el valor")
        let _personaje = await personaje.findOne({ where: { activo: 1, idPersonaje: idPersonaje } })
        classConsole.logDeveloper(_personaje)
        if (!_personaje) return ("No se encontro el valor")
        let _zona = await zona.findOne({ where: { activo: 1, idZona: idZona } })
        classConsole.logDeveloper(_zona)
        if (!_zona) return ("No se encontro el valor")

        //insert tabla zona
        let response = await zona_personaje.create({
            idZona: idZona,
            idPersonaje: idPersonaje,
            dias: dias,
            horas: horas
        })
        classConsole.logDeveloper(response)
        return response
    }
    catch (error) {
        throw error
    }
}

let update = async (id, idZona, idPersonaje, dias, horas) => {
    try {
        let query = {}
        //genera un arreglo con solo los campos que se requieren modificar, asi podemos editar solo el apellido, como todo los campos si el usuario gusta
        if (idZona !== undefined) {
            let _zona = await zona.findOne({ where: { activo: 1, idZona: idZona } })
            classConsole.logDeveloper(_zona)
            if (!_zona) return ("No se encontro el valor")
            query["idEntrenador"] = idEntrenador
        }
        if (idPersonaje !== undefined) {
            let _personaje = await personaje.findOne({ where: { activo: 1, idPersonaje: idPersonaje } })
            classConsole.logDeveloper(_personaje)
            if (!_personaje) return ("No se encontro el valor")
            query["idPlaneta"] = idPlaneta
        }
        if (dias !== undefined) {
            query["dias"] = dias
        }
        if (horas !== undefined) {
            query["horas"] = horas
        }
        //se modifica la informacion de la tabla tbl_entrenador
        await zona_personaje.update(
            query,
            {
                where:
                {
                    id: id
                }
            })
        return "Updated"
    } catch (error) {
        throw error
    }
}
let deleted = async (id) => {
    //se cambia de estado al entrenador
    try {
        zona_personaje.update(
            { activo: 0 },
            {
                where:
                {
                    id: id
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
    deleted
}