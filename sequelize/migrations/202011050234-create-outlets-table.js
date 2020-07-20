module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "outlets",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      cityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        comment: "Physical City",
        references: {
          key: "id",
          model: "cities",
        },
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        comment: "OutletName",
      },
      address: {
        type: DataTypes.STRING,
        comment: "Physical address",
      },
      online: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      default: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: false,
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
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("outlets");
