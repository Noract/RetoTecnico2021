'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_personaje extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            tbl_personaje.belongsToMany(models.tbl_zona,
                {
                    foreignKey: 'idPersonaje',
                    through: 'tbl_zona_personaje',
                    as: 'tbl_zona',
                    freezeTableName: true,
                }
            );
        }
    };
    tbl_personaje.init({
        idPersonaje: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IMC: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        composicion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idSwappi: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
    }, {
        sequelize,
        modelName: 'tbl_personaje',
        createdAt: "fecCreacion",
        updatedAt: "fecModificacion",
        timestamps: true,
        freezeTableName: true,
    });
    return tbl_personaje;
};