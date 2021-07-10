'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_zona_personaje extends Model {
        static associate(models) {
            tbl_zona_personaje.belongsTo(models.tbl_zona,
                {
                    as: 'tbl_zona',
                    foreignKey: 'idZona',
                }
            )
            tbl_zona_personaje.belongsTo(models.tbl_personaje,
                {
                    as: 'tbl_personaje',
                    foreignKey: 'idPersonaje',
                }
            )
        }
    };
    tbl_zona_personaje.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idZona: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        idPersonaje: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        dias: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        horas: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'tbl_zona_personaje',
        createdAt: "fecCreacion",
        updatedAt: "fecModificacion",
        timestamps: true,
        freezeTableName: true
    });
    return tbl_zona_personaje;
};