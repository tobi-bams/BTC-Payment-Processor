"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wallets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeUuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Stores",
          key: "uuid",
        },
      },
      xpub: {
        type: Sequelize.STRING,
      },
      derivationPath: {
        type: Sequelize.STRING,
      },
      currentIndex: {
        type: Sequelize.INTEGER,
      },
      macaroon: {
        type: Sequelize.STRING(7000),
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
    await queryInterface.dropTable("Wallets");
  },
};
