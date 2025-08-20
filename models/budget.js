'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { name: 'userID', },
      })
    }
  }
  Budget.init({
    id:{
      type:  DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    deleted: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};