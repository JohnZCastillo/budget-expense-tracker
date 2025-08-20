'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetVisibility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BudgetVisibility.init({
    id:{
      type:  DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coverage: DataTypes.DATEONLY,
    budgetID: DataTypes.INTEGER,
    categoryID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BudgetVisibility',
  });
  return BudgetVisibility;
};