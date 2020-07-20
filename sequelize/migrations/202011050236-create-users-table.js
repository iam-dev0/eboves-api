module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      outletId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "outlets",
        },
      },
      supplierId: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      firstName: {
        type: DataTypes.STRING,
        comment: "Company Name",
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      designation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Contact person email",
      },
      emailVerifyAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Contact person phone",
      },
      phoneVerifyAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM(["male", "female", "other"]),
      },

      DOB: {
        type: DataTypes.DATE,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },

      createdBy: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete:"No Action"
      },

      updatedBy: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete:"No Action"
      },
      deletedBy: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete:"No Action"
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

module.exports.down = (queryInterface) => queryInterface.dropTable("users");
