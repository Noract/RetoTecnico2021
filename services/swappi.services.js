const fetch = require('node-fetch');
require('dotenv').config()
async function getPeople() {
    try {
        var personas = [];
        let people;
        for (let page = 0; page < 1000; page++) {
            people = `${process.env.API_SWAPPI}people?page=${page}`
            const response = await fetch(people, {
                method: 'get'
            })
            const person = await response.json();
            if (person.detail == 'Not found')
                continue
            if (person.results.length == 10) {
                person.results.forEach(item => {
                    personas.push({
                        nombre: item.name,
                        talla: item.height,
                        peso: item.mass,
                        color_pelo: item.hair_color,
                        color_piel: item.skin_color,
                        color_ojo: item.eye_color,
                        cumpleano: item.birth_year,
                        genero: item.gender,
                        mundo_hogar: item.homeworld,
                        pelicula: item.films,
                        especie: item.species,
                        vehiculo: item.vehicles,
                        nave_estelar: item.starships
                    })
                })
            } else {
                person.results.forEach(item => {
                    personas.push({
                        nombre: item.name,
                        talla: item.height,
                        peso: item.mass,
                        color_pelo: item.hair_color,
                        color_piel: item.skin_color,
                        color_ojo: item.eye_color,
                        cumpleano: item.birth_year,
                        genero: item.gender,
                        mundo_hogar: item.homeworld,
                        pelicula: item.films,
                        especie: item.species,
                        vehiculo: item.vehicles,
                        nave_estelar: item.starships
                    })
                })
                break;
            }
        }
        return personas;
    } catch (error) {
        console.log(error);
    }

};
async function findPeople(id) {
    try {
        var personas = [];
        const response = await fetch(`${process.env.API_SWAPPI}people/${id}`, {
            method: 'get'
        })
        const person = await response.json();
        personas.push({
            nombre: person.name,
            talla: person.height,
            peso: person.mass,
            color_pelo: person.hair_color,
            color_piel: person.skin_color,
            color_ojo: person.eye_color,
            cumpleano: person.birth_year,
            genero: person.gender,
            mundo_hogar: person.homeworld,
            pelicula: person.films,
            especie: person.species,
            vehiculo: person.vehicles,
            nave_estelar: person.starships
        })

        return personas;
    } catch (error) {
        console.log(error);
    }

};
async function getPlanet() {
    try {
        var planetas = [];
        let planet;
        for (let page = 0; page < 1000; page++) {
            planet = `${process.env.API_SWAPPI}planets?page=${page}`
            const response = await fetch(planet, {
                method: 'get'
            })

            const planets = await response.json();
            if (planets.detail == 'Not found')
                continue
            if (planets.results.length == 10) {
                planets.results.forEach(item => {
                    planetas.push({
                        clima: item.climate,
                        diametro: item.diameter,
                        gravedad: item.gravity,
                        nombre: item.name,
                        periodo_orbital: item.orbital_period,
                        poblacion: item.population,
                        residente: item.residents,
                        periodo_rotacion: item.rotation_period,
                        superficie_acuatica: item.surface_water,
                        terreno: item.terrain,
                    })
                })
            } else {
                planets.results.forEach(item => {
                    planetas.push({
                        clima: item.climate,
                        diametro: item.diameter,
                        gravedad: item.gravity,
                        nombre: item.name,
                        periodo_orbital: item.orbital_period,
                        poblacion: item.population,
                        residente: item.residents,
                        periodo_rotacion: item.rotation_period,
                        superficie_acuatica: item.surface_water,
                        terreno: item.terrain,
                    })
                })
                break;
            }
        }
        return planetas;
    } catch (error) {
        console.log(error);
    }

};
async function findPlanet(id) {
    try {
        var planetas = [];
        console.log(id)
        const response = await fetch(`${process.env.API_SWAPPI}planets/${id}`, {
            method: 'get'
        })
        const planets = await response.json();
        planetas.push({
            clima: planets.climate,
            diametro: planets.diameter,
            gravedad: planets.gravity,
            nombre: planets.name,
            periodo_orbital: planets.orbital_period,
            poblacion: planets.population,
            residente: planets.residents,
            periodo_rotacion: planets.rotation_period,
            superficie_acuatica: planets.surface_water,
            terreno: planets.terrain,
        })
        return planetas;
    } catch (error) {
        console.log(error);
    }

};
async function getFilms() {
    try {
        var peliculas = [];
        for (let page = 0; page < 1000; page++) {
            const response = await fetch(`${process.env.API_SWAPPI}films?page=${page}`, {
                method: 'get'
            })

            const films = await response.json();
            if (films.detail == 'Not found')
                continue
            if (films.results.length == 10) {
                films.results.forEach(item => {
                    peliculas.push({
                        pernsonaje: item.characters,
                        director: item.director,
                        episodio: item.episode_id,
                        sinopsis: item.opening_crawl,
                        planetas: item.planets,
                        productor: item.producer,
                        fecha_lanzamiento: item.release_date,
                        especies: item.species,
                        nave_estelar: item.starships,
                        titulo: item.title,
                        vehiculo: item.vehicles,
                    })
                })
            } else {
                films.results.forEach(item => {
                    peliculas.push({
                        pernsonaje: item.characters,
                        director: item.director,
                        episodio: item.episode_id,
                        sinopsis: item.opening_crawl,
                        planetas: item.planets,
                        productor: item.producer,
                        fecha_lanzamiento: item.release_date,
                        especies: item.species,
                        nave_estelar: item.starships,
                        titulo: item.title,
                        vehiculo: item.vehicles,
                    })
                })
                break;
            }
        }
        return peliculas;
    } catch (error) {
        console.log(error);
    }

};

async function findFilms(id) {
    try {
        var peliculas = [];
        let film;

        const response = await fetch(`${process.env.API_SWAPPI}films/${id}`, {
            method: 'get'
        })

        const films = await response.json();

        peliculas.push({
            pernsonaje: films.characters,
            director: films.director,
            episodio: films.episode_id,
            sinopsis: films.opening_crawl,
            planetas: films.planets,
            productor: films.producer,
            fecha_lanzamiento: films.release_date,
            especies: films.species,
            nave_estelar: films.starships,
            titulo: films.title,
            vehiculo: films.vehicles,
        })
        return peliculas;
    } catch (error) {
        console.log(error);
    }

};
async function getStarShip() {
    try {
        var nave_estelar = [];
        for (let page = 0; page < 1000; page++) {
            const response = await fetch(`${process.env.API_SWAPPI}starships?page=${page}`, {
                method: 'get'
            })

            const startShips = await response.json();
            if (startShips.detail == 'Not found')
                continue
            if (startShips.results.length == 10) {
                startShips.results.forEach(item => {
                    nave_estelar.push({
                        MGLT: item.MGLT,
                        capacidad_carga: item.cargo_capacity,
                        consumibles: item.consumables,
                        costo_en_creditos: item.cost_in_credits,
                        tripulacion: item.crew,
                        capacidad_hiperimpulsor: item.hyperdrive_rating,
                        largo: item.length,
                        fabricante: item.manufacturer,
                        velocidad_maxima_atmosfera: item.max_atmosphering_speed,
                        modelo: item.model,
                        nombre: item.name,
                        pasajeros: item.passengers,
                        peliculas: item.films,
                        pilotos: item.pilots,
                        clase_nave_estelar: item.starship_class,
                    })
                })
            } else {
                startShips.results.forEach(item => {
                    nave_estelar.push({
                        MGLT: item.MGLT,
                        capacidad_carga: item.cargo_capacity,
                        consumibles: item.consumables,
                        costo_en_creditos: item.cost_in_credits,
                        tripulacion: item.crew,
                        capacidad_hiperimpulsor: item.hyperdrive_rating,
                        largo: item.length,
                        fabricante: item.manufacturer,
                        velocidad_maxima_atmosfera: item.max_atmosphering_speed,
                        modelo: item.model,
                        nombre: item.name,
                        pasajeros: item.passengers,
                        peliculas: item.films,
                        pilotos: item.pilots,
                        clase_nave_estelar: item.starship_class,
                    })
                })
                break;
            }
        }
        return nave_estelar;
    } catch (error) {
        console.log(error);
    }

};
async function findStarShip(id) {
    try {
        var nave_estelar = [];
        const response = await fetch(`${process.env.API_SWAPPI}starships/${id}`, {
            method: 'get'
        })
        const startShips = await response.json();
        nave_estelar.push({
            MGLT: startShips.MGLT,
            capacidad_carga: startShips.cargo_capacity,
            consumibles: startShips.consumables,
            costo_en_creditos: startShips.cost_in_credits,
            tripulacion: startShips.crew,
            capacidad_hiperimpulsor: startShips.hyperdrive_rating,
            largo: startShips.length,
            fabricante: startShips.manufacturer,
            velocidad_maxima_atmosfera: startShips.max_atmosphering_speed,
            modelo: startShips.model,
            nombre: startShips.name,
            pasajeros: startShips.passengers,
            peliculas: startShips.films,
            pilotos: startShips.pilots,
            clase_nave_estelar: startShips.starship_class,
        })
        return nave_estelar;
    } catch (error) {
        console.log(error);
    }

};
async function getVehicules() {
    try {
        var vehiculos = [];
        for (let page = 0; page < 1000; page++) {
            const response = await fetch(`${process.env.API_SWAPPI}vehicles?page=${page}`, {
                method: 'get'
            })
            const vehicles = await response.json();
            if (vehicles.detail == 'Not found')
                continue
            if (vehicles.results.length == 10) {
                vehicles.results.forEach(item => {
                    vehiculos.push({
                        capacidad_Carga: item.cargo_capacity,
                        consumibles: item.consumables,
                        costo_creditos: item.cost_in_credits,
                        tripulacion: item.crew,
                        largo: item.length,
                        fabricante: item.manufacturer,
                        velocidad_maxima_atmosfera: item.max_atmosphering_speed,
                        modelo: item.model,
                        nombre: item.name,
                        pasajeros: item.passengers,
                        pilotos: item.pilots,
                        peliculas: item.films,
                        clase_vehiculo: item.vehicle_class,
                    })
                })
            } else {
                vehicles.results.forEach(item => {
                    vehiculos.push({
                        capacidad_Carga: item.cargo_capacity,
                        consumibles: item.consumables,
                        costo_creditos: item.cost_in_credits,
                        tripulacion: item.crew,
                        largo: item.length,
                        fabricante: item.manufacturer,
                        velocidad_maxima_atmosfera: item.max_atmosphering_speed,
                        modelo: item.model,
                        nombre: item.name,
                        pasajeros: item.passengers,
                        pilotos: item.pilots,
                        peliculas: item.films,
                        clase_vehiculo: item.vehicle_class,
                    })
                })
                break;
            }
        }
        return vehiculos;
    } catch (error) {
        console.log(error);
    }

};
async function findVehicules(id) {
    try {
        var vehiculos = [];
        const response = await fetch(`${process.env.API_SWAPPI}vehicles/${id}`, {
            method: 'get'
        })
        const vehicles = await response.json();
        vehiculos.push({
            capacidad_Carga: vehicles.cargo_capacity,
            consumibles: vehicles.consumables,
            costo_creditos: vehicles.cost_in_credits,
            tripulacion: vehicles.crew,
            largo: vehicles.length,
            fabricante: vehicles.manufacturer,
            velocidad_maxima_atmosfera: vehicles.max_atmosphering_speed,
            modelo: vehicles.model,
            nombre: vehicles.name,
            pasajeros: vehicles.passengers,
            pilotos: vehicles.pilots,
            peliculas: vehicles.films,
            clase_vehiculo: vehicles.vehicle_class,
        })
        return vehiculos;
    } catch (error) {
        console.log(error);
    }

};
async function getSpecies() {
    try {
        var especies = [];
        for (let page = 0; page < 1000; page++) {
            const response = await fetch(`${process.env.API_SWAPPI}species?page=${page}`, {
                method: 'get'
            })

            const species = await response.json();
            if (species.detail == 'Not found')
                continue
            if (species.results.length == 10) {
                species.results.forEach(item => {
                    especies.push({
                        altura_promedio: item.average_height,
                        vida_promedio: item.average_lifespan,
                        clasificacion: item.classification,
                        designacion: item.designation,
                        color_ojos: item.eye_colors,
                        color_pelo: item.hair_colors,
                        mundo_hogar: item.homeworld,
                        lenguaje: item.language,
                        nombre: item.name,
                        persona: item.people,
                        peliculas: item.films,
                        color_piel: item.skin_colors,
                    })
                })
            } else {
                species.results.forEach(item => {
                    especies.push({
                        altura_promedio: item.average_height,
                        vida_promedio: item.average_lifespan,
                        clasificacion: item.classification,
                        designacion: item.designation,
                        color_ojos: item.eye_colors,
                        color_pelo: item.hair_colors,
                        mundo_hogar: item.homeworld,
                        lenguaje: item.language,
                        nombre: item.name,
                        persona: item.people,
                        peliculas: item.films,
                        color_piel: item.skin_colors,
                    })
                })
                break;
            }
        }
        return especies;
    } catch (error) {
        console.log(error);
    }

};
async function findSpecies(id) {
    try {
        var especies = [];
        const response = await fetch(`${process.env.API_SWAPPI}species/${id}`, {
            method: 'get'
        })
        const species = await response.json();
        especies.push({
            altura_promedio: species.average_height,
            vida_promedio: species.average_lifespan,
            clasificacion: species.classification,
            designacion: species.designation,
            color_ojos: species.eye_colors,
            color_pelo: species.hair_colors,
            mundo_hogar: species.homeworld,
            lenguaje: species.language,
            nombre: species.name,
            persona: species.people,
            peliculas: species.films,
            color_piel: species.skin_colors,
        })
        return especies;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getPeople,
    findPeople,
    getPlanet,
    findPlanet,
    getFilms,
    findFilms,
    getStarShip,
    findStarShip,
    getVehicules,
    findVehicules,
    getSpecies,
    findSpecies
}