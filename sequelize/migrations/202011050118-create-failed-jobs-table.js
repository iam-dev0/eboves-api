module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "failed_Jobs",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED
        },
        connection: {
          allowNull: true,
          type: DataTypes.TEXT
        },
        queue: {
            allowNull: true,
            type: DataTypes.TEXT
          },
        payload: {
          allowNull: true,
          type: DataTypes.TEXT("long")
        },
        exception: {
          allowNull: true,
          type: DataTypes.TEXT("long")
        },
        failedAt:{
          allowNull: true,
          type: DataTypes.DATE
        }
      },
      {
        charset: "utf8"
      }
    );
  };
  
  module.exports.down = queryInterface => queryInterface.dropTable("failed_Jobs");