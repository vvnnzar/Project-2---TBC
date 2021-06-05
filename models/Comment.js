const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
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
        model: "user",
        key: "id",
      },
    },
    question_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "question",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
