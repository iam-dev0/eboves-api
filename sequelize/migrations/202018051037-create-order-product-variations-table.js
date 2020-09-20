module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "order_product_variations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      orderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "orders",
        },
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "products",
        },
      },
      productVariationid: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
      },
      supplierId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      supplierPrice: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      discountedPercentage: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      discountReason: DataTypes.TEXT,

      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
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

      returedQuantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      returnReson: DataTypes.TEXT,

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

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("order_product_variations");
