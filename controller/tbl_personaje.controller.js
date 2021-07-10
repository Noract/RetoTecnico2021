
const classConsole = require('../helper/classLogs')
const zona = require("../models").tbl_zona;
const personaje = require("../models").tbl_personaje;
const swappi = require('../services/swappi.services')
const lib = require('../libs/libs')

let create = async (idSwappi) => {
    try {
        //se valida campos
        if (!idSwappi)
            return ("No se encontro el valor")
        //consulta swappi
        let swappis = await swappi.findPeople(idSwappi)
        if (swappis.length == 0) return ("No se encontro el Id Buscado")
        //se calcula el IMC 
        let _swappis = swappis[0]
        let talla, IMC, composicion;
        talla = Math.pow(_swappis.talla / 100, 2);
        IMC = _swappis.peso / talla;
        //se llama a una funcion que trabaja con el IMC devolviendo un string de resultado al IMC
        composicion = lib.composicion(IMC)
        //se registra a la persona
        let _personaje = await personaje.create({
            nombre: _swappis.nombre,
            IMC: IMC,
            composicion: composicion,
            idSwappi: idSwappi
        })
        return _personaje
    }
    catch (error) {
        throw error
    }
}

let list = async () => {
    try {
        //condicionales para el endpoint limita, ordena por y organiza
        let _personaje = await personaje.findAll({
            include: {
                model: zona,
                as: "tbl_zona",
                through: {},
            },
            where: {
                activo: 1
            }
        })
        return _personaje
    } catch (error) {
        throw error
    }
}

let find = async (idPersonaje) => {
    try {
        let _personaje = personaje.findOne({
            include: {
                model: zona,
                as: "tbl_zona",
                through: {},
            },
            where: {
                idPersonaje: idPersonaje,
                activo: 1
            }
        })
        return _personaje
    } catch (error) {
        throw error
    }

}

let update = async (idPersonaje, idSwappi) => {
    //se valida campos
    if (!idSwappi)
        return ("No se encontro el valor")
    //se consulta a swappi
    let swappis = await swappi.findPeople(idSwappi)
    if (swappis.length == 0) return ("No se encontro el valor")
    let _swappis = swappis[0]
    let talla, IMC, composicion;
    talla = Math.pow(_swappis.talla / 100, 2);
    IMC = _swappis.peso / talla;
    //se llama a una funcion que trabaja con el IMC devolviendo un string de resultado al IMC
    composicion = lib.composicion(IMC)
    //se modifica los datos de la tabla tbl_personaje
    await personaje.update(
        {
            nombre: _swappis.nombre,
            IMC: IMC,
            composicion: composicion,
            idSwappi: idSwappi
        },
        {
            where:
            {
                idPersonaje: idPersonaje
            }
        }
    )
    return "Updated"
}
async function deleted(idPersonaje) {
    //se cambia de estado al personaje
    await personaje.update(
        { activo: 0 },
        {
            where:
            {
                idPersonaje: idPersonaje
            }
        }
    )
    return "Deleted"

}

module.exports = {
    create,
    update,
    find,
    list,
    deleted
}