module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_variation_attribute_values",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      attributeId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "attributes",
        },
      },
      productVariationId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "product_variations",
        },
      },
      value: DataTypes.STRING,
      alt: DataTypes.STRING,
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("product_variation_attribute_values");
