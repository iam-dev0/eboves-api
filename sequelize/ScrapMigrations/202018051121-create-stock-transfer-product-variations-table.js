module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "stock_transfer_product_variations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      stockTransferId: {
        
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
      receivedQuantity: DataTypes.INTEGER.UNSIGNED,

      createdBy: {
        // allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      updatedBy: {
        // allowNull: false,
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
  queryInterface.dropTable("stock_transfer_product_variations");
