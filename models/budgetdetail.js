'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BudgetDetail.init({
     id:{
      type:  DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    budgetID: DataTypes.INTEGER,
    coverage: DataTypes.DATEONLY,
    init: DataTypes.BOOLEAN,
    deleted: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BudgetDetail',
  });
  return BudgetDetail;
};