const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reputations extends Model {}

Reputations.init(
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
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'reputations',
    }
);
