module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_variation_barcodes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      productVariationId: {    
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
        onDelete: "CASCADE",
      },
      barcode: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      // supplierPrice: {
      //   allowNull: false,
      //   type: DataTypes.FLOAT,
      // },
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
  queryInterface.dropTable("product_variation_barcodes");
