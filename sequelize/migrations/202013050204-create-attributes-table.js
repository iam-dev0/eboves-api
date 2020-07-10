module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "attributes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(["text", "numeric", "image"]),
        default: "string",
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      createdBy: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },

      updatedBy: {
        allowNull: true,
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
  queryInterface.dropTable("attributes");
