module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "features",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name:DataTypes.STRING
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("features");
