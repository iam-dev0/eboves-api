module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product_attribute",
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
      productId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "products",
        },
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("product_attribute");
