'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      budgetDetailID: {
        type: Sequelize.INTEGER,
          references: {
          model: {
            tableName: 'BudgetDetails',
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
        allowNull: false,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expenses');
  }
};