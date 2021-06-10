const User = require("./User");
const IsTutor = require("./IsTutor");
const Comment = require("./Comment");
const Question = require("./Question");
const Reputation = require("./Reputation");
const QuizResult = require("./QuizResult");
const Note = require("./Note");

User.hasMany(Question, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Question.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasOne(Reputation, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Reputation.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasOne(QuizResult, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

QuizResult.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Question.hasMany(Comment, {
    foreignKey: "question_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Question, {
    foreignKey: "question_id",
    onDelete: "CASCADE",
});

User.hasMany(Note, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Note.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

module.exports = {
    User,
    IsTutor,
    Comment,
    Question,
    Reputation,
    QuizResult,
    Note,
};
