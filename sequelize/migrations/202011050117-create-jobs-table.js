module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "jobs",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED
        },
        queue: {
          allowNull: true,
          type: DataTypes.STRING
        },
        payload: {
          allowNull: true,
          type: DataTypes.TEXT
        },
        attempts: {
          allowNull: false,
          type: DataTypes.TINYINT.UNSIGNED
        },
        reservedAt:{
          allowNull: true,
          type: DataTypes.DATE
        },
        availableAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE
        }
      },
      {
        charset: "utf8"
      }
    );
  };
  
  module.exports.down = queryInterface => queryInterface.dropTable("jobs");