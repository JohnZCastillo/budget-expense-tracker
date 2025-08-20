'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BudgetDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.FLOAT
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
      coverage: {
        type: Sequelize.DATEONLY
      },
      init: {
        type: Sequelize.BOOLEAN
      },
      deleted: {
        type: Sequelize.DATE
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

    await queryInterface.addConstraint('BudgetDetails', {
      type: 'UNIQUE',
      fields: ['budgetID', 'coverage', 'init'],
      name: 'unique_budget_details',
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BudgetDetails');
  }
};