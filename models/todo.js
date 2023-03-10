"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getTodos() {
      return this.findAll(); //from sequelize package  donot confuse bro
    }

    

    static async dueToday() {
      return this.findAll({
        where: { dueDate: new Date() },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return this.findAll({
        where: { dueDate: { [Op.gt]: new Date() } }, //greater than the duedate
        order: [["id", "ASC"]],
      });
    }
    static async overdue() {
      return this.findAll({
        where: { dueDate: { [Op.lt]: new Date() } }, //greater than the duedate
        order: [["id", "ASC"]],
      });
    }


    static addTodo({ title, dueDate }) {
      //refactoring for business logic and we can add a todo at any endpoint
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
