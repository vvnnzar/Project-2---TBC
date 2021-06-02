const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class QuizResult extends Model {}

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
        },
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quizResult',
    }
);

module.exports = QuizResult;