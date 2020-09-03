module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "orders",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      outletId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "outlets",
        },
      },

      customerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "customers",
        },
      },
      shippingInformationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "shipping_information",
        },
      },

      source: DataTypes.STRING,

      orderNumber: {
        unique: true,
        type: DataTypes.STRING,
      },

      stockOrderer: {
        type: DataTypes.BOOLEAN,
        default: false,
      },

      status: {
        type: DataTypes.ENUM([
          "PENDING",
          "CONFIRMED",
          "CANCELED",
          "OUT_OF_STOCK",
          "DISPATCHED",
          "DELIEVERED",
          "RETURNED",
        ]),
        default: "PENDING",
      },

      /*Prices*/
      discountedPercentage: DataTypes.INTEGER.UNSIGNED,
      discountedAmount: {
        type: DataTypes.FLOAT,
        default: 0,
      },

      shippingCharges: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      tax: {
        type: DataTypes.FLOAT,
        default: 0,
      },

      // remarksByCustomer: DataTypes.TEXT,
      // remarksByCsr: DataTypes.TEXT,
      // remarksByWarehouse: DataTypes.TEXT,

      discountReason: DataTypes.TEXT,
      shippingChargesRemovedReason: DataTypes.TEXT,
      returnReason: DataTypes.TEXT,
      cancelReason: DataTypes.TEXT,

      paymentMethod: {
        type: DataTypes.ENUM([
          "CASH_ON_DELIEVERY",
          "CREDIT_CARD",
          "BANK_TRANSFER",
        ]),
        default: "CASH_ON_DELIEVERY",
      },

      paymentReferenceNo: DataTypes.TEXT,

      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      deletedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      /*Action At*/

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("orders");
