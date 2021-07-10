'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_zona extends Model {
        static associate(models) {
            tbl_zona.belongsTo(models.tbl_entrenador,
                {
                    as: 'tbl_entrenador',
                    foreignKey: 'idEntrenador',
                }
            )
            tbl_zona.belongsToMany(models.tbl_personaje,
                {
                    foreignKey: 'idZona',
                    through: 'tbl_zona_personaje',
                    as: 'tbl_personaje',
                    freezeTableName: true,
                }
            );
        }
    };
    tbl_zona.init({
        idZona: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombrePlaneta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gravedad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        activo: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        idPlaneta: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        idEntrenador: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'tbl_zona',
        createdAt: "fecCreacion",
        updatedAt: "fecModificacion",
        timestamps: true,
        freezeTableName: true
    });
    return tbl_zona;
};