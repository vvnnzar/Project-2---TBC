const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class QuizResult extends Model {}

<<<<<<< HEAD:models/QuizResults.js
QuizResult.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        times_taken: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        last_score: {
            type: DataTypes.TINYINT.UNSIGNED,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            reference: {
                model: "user",
                key: "id",
            },
=======
QuizResult.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    times_taken: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    last_score: {
        type: DataTypes.TINYINT.UNSIGNED,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        reference: {
            model: 'user',
            key: 'id',
>>>>>>> d402544e6770f01845301861ecc2cd9100aaf19d:models/QuizResult.js
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
<<<<<<< HEAD:models/QuizResults.js
        modelName: "quizResult",
=======
        modelName: 'quizResult',
>>>>>>> d402544e6770f01845301861ecc2cd9100aaf19d:models/QuizResult.js
    }
);

module.exports = QuizResult;