module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "order_product_variation_purchase_order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      orderProductVariationId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "order_product_variations",
        },
      },
      purchaseOrderId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "purchase_orders",
        },
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("order_product_variation_purchase_order");
