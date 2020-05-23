module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "stocks",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      outletId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "outlets",
        },
      },
      productVariationId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
      },
      supplierId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      availableQuantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      bookedQuantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      dispatchedQuantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      deliveredQuantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      damagedQuantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      inTransitTquantity: { type: DataTypes.INTEGER.UNSIGNED, default: 0 },
      active: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
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
        allowNull: true,
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
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("stocks");
