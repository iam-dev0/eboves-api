module.exports.up = (queryInterface, DataTypes) => {
  return Promise.all([
    queryInterface.addColumn("outlets", "managerId", {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: "Outlet's manager",
      references: {
        key: "id",
        model: "users",
      },
    }),
    queryInterface.addColumn("outlets", "createdBy", {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        key: "id",
        model: "users",
      },
    }),
    queryInterface.addColumn("outlets", "updatedBy", {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        key: "id",
        model: "users",
      },
    }),
    queryInterface.addColumn("outlets", "deletedBy", {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        key: "id",
        model: "users",
      },
    }),
  ]);
};

module.exports.down = (queryInterface) => {
  return Promise.all([
    queryInterface.removeColumn("outlets", "managerId"),
    queryInterface.removeColumn("outlets", "createdBy"),
    queryInterface.removeColumn("outlets", "updatedBy"),
    queryInterface.removeColumn("outlets", "deletedBy"),
    
  ]);
};
