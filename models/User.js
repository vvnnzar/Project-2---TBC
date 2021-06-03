const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class User extends Model {}

User.init(
    {
        id: {
<<<<<<< HEAD
            type: DataTypes.INTEGER.UNSIGNED,
=======
            type: DataTypes.INTEGER,
            // allowNull: false,
>>>>>>> ecf9603 (minor updates)
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(26),
<<<<<<< HEAD
            allowNull: false,
            unique: true,
=======
            // allowNull: false,
            // unique: true,
>>>>>>> ecf9603 (minor updates)
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
