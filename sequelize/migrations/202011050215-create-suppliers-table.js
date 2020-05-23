module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "suppliers",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      countryId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      companyName: {
        type: DataTypes.STRING,
        comment: "Company Name",
      },
      slug: {
        uniqueKey: true,
        type: DataTypes.STRING,
        comment: "Company Name Slug",
      },
      code: {
        uniqueKey: true,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Company description",
      },
      website: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Company official website",
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Contact person email",
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Contact person phone",
      },
      warehouseAddress: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "warehouse Address",
      },
      warehouseCityId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      commissionPercentage: {
        allowNull: true,
        type: DataTypes.FLOAT,
        comment: "It is commission percentage decided with local supplier",
      },
      local: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
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

module.exports.down = (queryInterface) => queryInterface.dropTable("suppliers");
