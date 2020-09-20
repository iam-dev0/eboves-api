module.exports.up = (queryInterface, DataTypes) => {
  //     name,
  //     email,
  //     phone,
  //     message,
  //     subject,
  return queryInterface.createTable(
    "contact_us",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("contact_us");
