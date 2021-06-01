const { Model, DataTypes } = require("sequelize");

const sequelize = require("connection location goes here");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.NUMBER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(22),
            unique: true,
            allowNull: false,
        },
        password: { type: DataTypes.STRING(66), allowNull: false },
        firstName: { type: DataTypes.STRING(56), allowNull: false },
        lastName: { type: DataTypes.STRING(56), allowNull: false },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
            validate: { isEmail: true, notEmpty: true },
        },
        isTutor: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        sequelize,
        modelName: "user",
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = User;
