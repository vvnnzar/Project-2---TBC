const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../config/connection");

class User extends Model {
    async comparePassword(password, passwordToConfirm) {
        return await bcrypt.compare(password, passwordToConfirm);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(26),
            allowNull: false,
            unique: true,
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
