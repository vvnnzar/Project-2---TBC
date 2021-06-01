const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class QuizResults extends Model {}

QuizResults.init({
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
        modelName: 'quizResults',
    }
);
