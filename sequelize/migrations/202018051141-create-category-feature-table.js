module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "category_feature",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      categoryId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "categories",
        },
      },
      featureId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "features",
        },
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("category_feature");
