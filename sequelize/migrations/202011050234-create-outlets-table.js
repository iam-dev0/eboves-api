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
      outletName: {
        type: DataTypes.STRING,
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        comment: "PersonName",
      },
      email: {
        type: DataTypes.STRING,
        comment: "Contact person email",
      },
      phone: {
        type: DataTypes.STRING,
        comment: "Contact person phone",
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

      // createdBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },

      // updatedBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },
      // deletedBy: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      //   references: {
      //     key: "id",
      //     model: "users",
      //   },
      // },

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
