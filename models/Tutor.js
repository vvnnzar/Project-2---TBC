const { Model, DataTypes } = require("sequelize");

const sequelize = require("connection location goes here");

class Tutor extends Model {}

Tutor.init(
    {
        id: {
            type: DataTypes.NUMBER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.NUMBER.UNSIGNED,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        isFrontEnd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isBackEnd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        css: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        javaScript: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        html: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sql: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        node: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        react: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "tutor",
        underscored: true,
    }
);

module.exports = Tutor;
