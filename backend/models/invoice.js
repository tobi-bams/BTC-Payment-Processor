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
        type: DataTypes.DOUBLE(7, 2),
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
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.DOUBLE(13, 8),
        allowNull: false,
      },
      satoshi_paid: {
        type: DataTypes.DOUBLE(10, 8),
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
      lightning_invoice_hash: {
        type: DataTypes.STRING,
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
