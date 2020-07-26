module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "purchase_order_product_variations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      purchaseOrderId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "purchase_orders",
        },
      },
      productVariationId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
      },
      requestedQuantity: DataTypes.INTEGER.UNSIGNED,
      requestedPrice: DataTypes.DECIMAL,

      receivedQuantity: DataTypes.INTEGER.UNSIGNED,
      receivedPrice: DataTypes.DECIMAL,

      requestedBarcode: DataTypes.STRING,
      barcode: DataTypes.STRING,

      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      updatedBy: {
        allowNull: false,
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
  queryInterface.dropTable("purchase_order_product_variations");
