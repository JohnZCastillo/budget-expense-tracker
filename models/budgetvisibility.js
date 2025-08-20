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
    coverage: DataTypes.DATE,
    budgetID: DataTypes.INTEGER,
    categoryID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BudgetVisibility',
  });
  return BudgetVisibility;
};