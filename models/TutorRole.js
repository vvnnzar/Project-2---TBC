const { Model, DataTypes } = require("sequelize");

class TutorRole extends Model {}

TutorRole.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        role: { type: DataTypes.STRING(26), allowNull: false, unique: true },
    },
    {
        sequelize,
        modelName: "tutorRole",
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);
