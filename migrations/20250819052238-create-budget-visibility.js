'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BudgetVisibilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coverage: {
        type: Sequelize.DATEONLY
      },
      budgetID: {
        type: Sequelize.INTEGER,
          references: {
          model: {
            tableName: 'Budgets',
            schema: 'public',
          },
          key: 'id',
        },
      },
      categoryID: {
        type: Sequelize.INTEGER,
          references: {
          model: {
            tableName: 'Categories',
            schema: 'public',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BudgetVisibilities');
  }
};