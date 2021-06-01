// create table questions (
//     id int unsigned primary key auto_increment,
//     question_title varchar(52) not null,
//     question_text text not null,
//     user_id int unsigned not null,
//     question_tag varchar(12) not null,
//     foreign KEY (user_id) references users(id)
// );

const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Questions extends Model {}

Questions.init(
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
    question_tag: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Comments;
