module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "template",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      countryId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("template");
