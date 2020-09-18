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
          model: "orders",
        },
      },
      cityId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      // courierId: {
        
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "couriers",
      //   },
      // },
      customerId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "customers",
        },
      },
      customerAddressId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "customer_addresses",
        },
      },
      source: DataTypes.STRING,
      orderId: DataTypes.INTEGER.UNSIGNED,
      orderNumber: {
        unique: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },

      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,

      courierStatus: DataTypes.STRING,
      trackingNumber: DataTypes.STRING,

      confirmed: {
        type: DataTypes.BOOLEAN,
        default: false,
      },

      refunded: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      toBeRefunded: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      supplierOrder: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      returnFirstAttempt: {
        type: DataTypes.BOOLEAN,
        default: false,
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
      returnSecondAttempt: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      print: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      remarksByCustomer: DataTypes.TEXT,
      remarksByCsr: DataTypes.TEXT,
      remarksByWarehouse: DataTypes.TEXT,
      remarksByCourier: DataTypes.TEXT,

      /*Prices*/
      discountedPercentage: DataTypes.INTEGER.UNSIGNED,
      discountedAmount: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      shippingCharges: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      tax: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      prepaid: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      paymentMethod: {
        type: DataTypes.ENUM([
          "by_hand",
          "cash_on_delivery",
          "credit_card",
          "bank_transfer",
          "loyalty_points",
          "partial_loyalty_points",
        ]),
        default: "cash_on_delivery",
      },
      paymentReferenceNo: DataTypes.TEXT,

      discountReason: DataTypes.TEXT,
      shippingChargesRemovedReason: DataTypes.TEXT,
      returnReason: DataTypes.TEXT,
      cancelReason: DataTypes.TEXT,

      /*Action By*/
      confirmedBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },

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
      pendingReturnBy: {
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
      deliveryChargesRemovedBy: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
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
      /*Action At*/

      confirmedAt: {
        // allowNull: false,
        type: DataTypes.DATE,
      },

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
      pendingReturnAt: {
        type: DataTypes.DATE,
      },
      returnedAt: {
        type: DataTypes.DATE,
      },
      discountedAt: {
        type: DataTypes.DATE,
      },
      deliveryChargesRemovedAt: {
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
