'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_entrenador extends Model {
        static associate(models) {
            tbl_entrenador.hasMany(models.tbl_zona, {
                as: 'tbl_zona',
                foreignKey: 'idEntrenador',
            });
        }
    };
    tbl_entrenador.init({
        idEntrenador: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: true
        },
        edad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        codigoImperial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        activo: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
    }, {
        sequelize,
        modelName: 'tbl_entrenador',
        createdAt: "fecCreacion",
        updatedAt: "fecModificacion",
        timestamps: true,
        freezeTableName: true
    });
    return tbl_entrenador;
};