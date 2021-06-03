const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reputation extends Model {}

Reputation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        html_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        css_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        js_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sql_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        node_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        react_reputation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'reputation',
    }
);

module.exports = Reputation;