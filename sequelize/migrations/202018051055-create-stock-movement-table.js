module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "stock_movement",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      outletId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "outlets",
        },
      },
      supplierId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      supplierInvoiceNumber: DataTypes.STRING,
      delieveryDate: DataTypes.DATE,
      orderNumber: { type: DataTypes.STRING, unique: true },
      note: DataTypes.TEXT,

      status: {
        type: DataTypes.ENUM([
          "open",
          "stockOrdered",
          "stockReceived",
          "stockReturned",
        ]),
        default: "draft",
      },

      // underProcessingBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },

      // canceledBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },

      // closedBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },

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
  queryInterface.dropTable("stock_movement");
