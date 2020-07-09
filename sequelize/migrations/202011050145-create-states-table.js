module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "states",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      countryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          key: "id",
          model: "countries",
        },
        onDelete:"CASCADE"
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
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

module.exports.down = (queryInterface) => queryInterface.dropTable("states");
