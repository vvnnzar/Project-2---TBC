const { Model, DataTypes } = require("sequelize");
const User = require("./User");

const sequelize = require("../config/connection.js");

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question_title: {
      type: DataTypes.STRING(52),
      allowNull: false,
    },
    question_text: {
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

module.exports = Question;
