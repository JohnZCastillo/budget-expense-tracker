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
       userID: {
        type: Sequelize.INTEGER,
          references: {
          model: {
            tableName: 'Users',
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BudgetVisibilities');
  }
};