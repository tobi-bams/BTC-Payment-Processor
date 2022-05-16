"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Store, { foreignKey: "storeUuid" });
    }
  }
  Invoice.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      btc_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lightning_invoice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      satoshi_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storeUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
