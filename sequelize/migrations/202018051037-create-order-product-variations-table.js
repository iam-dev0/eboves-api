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
      brandId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "brands",
        },
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
      actualAmount: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      supplierPrice: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      discountedPercentage: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      status: {
        type: DataTypes.ENUM([
          "pending",
          "assign_to_supplier",
          "in_transit",
          "in_house",
          "out_of_stock",
          "dispatched",
          "delivered",
          "canceled",
          "pending_return",
          "returned",
        ]),
        default: "pending",
      },
      damagedQuantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      discountReason: DataTypes.TEXT,
      returnReson: DataTypes.TEXT,

      /*Action By*/
      assignToSupplierBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      inTransitBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      inHouseBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      outOfStockBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      dispatchedBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      deliveredBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      canceledBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      returnedBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      discountedBy: {
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

      /*Action By*/

      assignToSupplierAt: {
        type: DataTypes.DATE,
      },
      inTransitAt: {
        type: DataTypes.DATE,
      },
      inHouseAt: {
        type: DataTypes.DATE,
      },
      outOfStockAT: {
        type: DataTypes.DATE,
      },
      dispatchedAt: {
        type: DataTypes.DATE,
      },
      deliveredAt: {
        type: DataTypes.DATE,
      },
      canceledAt: {
        type: DataTypes.DATE,
      },
      returnedAt: {
        type: DataTypes.DATE,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("order_product_variations");
