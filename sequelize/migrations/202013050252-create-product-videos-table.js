module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_videos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      productId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "products",
        },
      },
     url:DataTypes.STRING,
     thumbnail:DataTypes.STRING,
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("product_videos");
