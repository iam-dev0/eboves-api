module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "shipping_information",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      customerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "customers",
        },
      },
      cityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("shipping_information");
