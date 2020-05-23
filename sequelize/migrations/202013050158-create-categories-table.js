module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "categories",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "categories",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      displayOrder: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      storyText: {
        type: DataTypes.STRING,
      },
      storyTextColor: {
        type: DataTypes.STRING,
      },
      storyCover: {
        type: DataTypes.STRING,
      },
      metaTitle: {
        type: DataTypes.TEXT,
      },
      metaKeywords: {
        type: DataTypes.TEXT,
      },
      metaDescription: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
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

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("categories");
