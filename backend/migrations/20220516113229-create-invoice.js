"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      btc_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lightning_invoice: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      exchange_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      satoshi_paid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storeUuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Stores",
          key: "uuid",
        },
      },
      lightning_invoice_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invoices");
  },
};
