module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "feature_values",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      featureId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "features",
        },
      },
      value: DataTypes.STRING,
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("feature_values");
