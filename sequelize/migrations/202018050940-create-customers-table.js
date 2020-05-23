module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "customers",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      firstname: DataTypes.STRING,
      firstname: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        uniqueKey: true,
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },

      password: DataTypes.STRING,
      image: DataTypes.STRING,
      dob: DataTypes.DATE,
      phone: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      emailVerificationCode: DataTypes.STRING,
      passwordResetCode: DataTypes.STRING,
      phoneVerificationCode: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      phoneVerifiedAt: DataTypes.DATE,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("customers");
