module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "products",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      sku: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      brandId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "brands",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "categories",
        },
      },
      supplierId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      attributeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "attributes",
        },
      },
      description: DataTypes.TEXT,
      descriptionImage: DataTypes.STRING,
      howToUse:DataTypes.TEXT,
      name: DataTypes.STRING,
      productCode: {
        uniqueKey: true,
        type: DataTypes.STRING,
        comment: "Product Handle",
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
        default: 0,
      },
      metaTitle: DataTypes.TEXT,
      metaKeywords: DataTypes.TEXT,
      metaDescription: DataTypes.TEXT,
      productType: {
        type: DataTypes.ENUM(["eboves", "supplier"]),
        default: "eboves",
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      commentsCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      rating: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
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

module.exports.down = (queryInterface) => queryInterface.dropTable("products");
