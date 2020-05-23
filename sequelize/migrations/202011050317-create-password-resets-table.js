module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "password_resets",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["email"],
        },
      ],
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("password_resets");
