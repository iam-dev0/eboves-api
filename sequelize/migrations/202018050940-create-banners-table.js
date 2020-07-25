module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "banners",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      href: DataTypes.STRING,
      type: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("banners");
