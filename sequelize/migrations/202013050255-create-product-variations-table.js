module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_variations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "products",
        },
      },
      mainImage: DataTypes.TEXT,
      mainBarcode: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      shortDescription: DataTypes.TEXT,
      sku: {
        unique: true,
        type: DataTypes.STRING,
      },
      virtualQuantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      price: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      supplierPrice: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      discountPercentage: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      discountPrice: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      discountStartTime: {
        type: DataTypes.DATE,
      },
      discountEndTime: {
        type: DataTypes.DATE,
      },
      trending: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      bestSeller: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      topRated: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      preOrder: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
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
  queryInterface.dropTable("product_variations");
