// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  development: {
    username: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT,
    dialect: "mysql",
  },
  test: {
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    port: process.env.TEST_DATABASE_PORT,
    dialect: "mysql",
  },
  production: {
    username: process.env.PRO_DATABASE_USER,
    password: process.env.PRO_DATABASE_PASSWORD,
    database: process.env.PRO_DATABASE_NAME,
    host: process.env.PRO_DATABASE_HOST,
    port: process.env.PRO_DATABASE_PORT,
    dialect: "mysql",
  },
};
