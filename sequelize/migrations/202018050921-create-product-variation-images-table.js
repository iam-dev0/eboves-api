module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_variation_images",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      productVariationId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("product_variation_images");
