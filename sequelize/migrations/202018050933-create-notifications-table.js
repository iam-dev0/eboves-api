module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "notifications",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      fromUserId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      toUserId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      notificationableId: DataTypes.INTEGER.UNSIGNED,
      notificationableType: DataTypes.STRING,
      heading: DataTypes.STRING,
      message: DataTypes.TEXT,
      actionName: DataTypes.STRING,
      actionUrl: DataTypes.STRING,
      mailed: DataTypes.BOOLEAN,
      seenAt: DataTypes.DATE,
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("notifications");
