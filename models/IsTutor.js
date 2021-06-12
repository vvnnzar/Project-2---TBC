const { Model, DataTypes } = require("sequelize");
const User = require("./User");

const sequelize = require("../config/connection");

class IsTutor extends Model {}

IsTutor.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
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
        underscored: true,
    }
);

module.exports = IsTutor;
