module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "brands",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      countryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      logo1: {
        type: DataTypes.STRING,
      },
      logo2: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
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
      popularity: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      new: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      metaTitle: DataTypes.TEXT,

      metaKeywords: DataTypes.TEXT,

      metaDescription: DataTypes.TEXT,

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
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("brands");
