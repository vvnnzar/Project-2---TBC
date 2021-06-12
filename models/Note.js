const { Model, DataTypes } = require("sequelize");
const User = require("./User");

const sequelize = require("../config/connection.js");

class Note extends Model {}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        note_title: {
            type: DataTypes.STRING(52),
            allowNull: false,
        },
        note_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
            timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Note;
