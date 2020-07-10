module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "cities",
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
          model: "countries",
        },
        onDelete: "CASCADE",
      },
      stateId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "states",
        },
        onDelete: "CASCADE",
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
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

module.exports.down = (queryInterface) => queryInterface.dropTable("cities");
