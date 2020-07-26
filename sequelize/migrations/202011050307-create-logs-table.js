module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "logs",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      userId: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      requestMethod: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      requestUri: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      activityName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      httpUserAgent: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      statusCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ipAddress: {
        allowNull: false,
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

module.exports.down = (queryInterface) => queryInterface.dropTable("logs");
