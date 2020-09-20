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
      cityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      companyName: {
        allowNull: false,
        type: DataTypes.STRING,
        comment: "Company Name",
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
        comment: "Company Name Slug",
      },
      code: {
        unique: true,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        comment: "Company description",
      },
      name: {
        type: DataTypes.STRING,
        comment: "Contact Name",
      },
      website: {
        isUrl: true,  
        type: DataTypes.STRING,
        comment: "Company official website",
      },
      email: {
        isEmail: true, 
        type: DataTypes.STRING,
        comment: "Contact person email",
      },
      phone: {
        // allowNull: false,
        type: DataTypes.STRING,
        comment: "Contact person phone",
      },
      warehouseAddress: {
        type: DataTypes.STRING,
        comment: "warehouse Address",
      },
      warehouseCityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "cities",
        },
      },
      commissionPercentage: {
        type: DataTypes.FLOAT,
        comment: "It is commission percentage decided with local supplier",
        default: 0,
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
        
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("suppliers");
