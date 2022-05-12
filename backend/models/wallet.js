"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Store, { foreignKey: "storeUuid" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Wallet.init(
    {
      xpub: {
        type: DataTypes.STRING,
      },
      storeUuid: {
        type: DataTypes.UUID,
      },
      derivationPath: {
        type: DataTypes.STRING,
      },
      currentIndex: {
        type: DataTypes.INTEGER,
      },
      macaroon: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
