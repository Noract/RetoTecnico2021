
module.exports = {
    composicion(IMC) {
        let composicion;
        if (IMC < 18.5) {
            return composicion = "Peso inferior al normal"
        } else if (IMC <= 24.9) {
            return composicion = "Normal"
        } else if (IMC <= 29.9) {
            return composicion = "Peso superior al normal"
        } else {
            return composicion = "Obesidad"
        }
    }

}