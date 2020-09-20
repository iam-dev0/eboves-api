module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "loyalties",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: DataTypes.STRING,
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      description: DataTypes.STRING,
      startFrom: {
        type: DataTypes.DOUBLE,
        default: 3000,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      perPointToPkr: { type: DataTypes.DOUBLE, default: 1 },
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

module.exports.down = (queryInterface) => queryInterface.dropTable("loyalties");
