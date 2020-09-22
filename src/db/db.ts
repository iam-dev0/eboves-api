import { Sequelize } from "sequelize-typescript";
import config, { databaseInfo } from "../config";

console.log("Trying to connect to server using", databaseInfo);
const sequelize = new Sequelize({
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true,
  },
  port: databaseInfo.port,
  username: databaseInfo.user,
  host: databaseInfo.host,
  password: databaseInfo.password,
  database: databaseInfo.name,
  timezone: "+00:00",
  pool: {
    max: 100,
    min: 0,
  },
  logging: (...msg) => {
    if (databaseInfo.databaseDebug) console.log(msg);
  },
  models: [__dirname + "./../models"],
});

sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((e) => console.error(e));
export default sequelize;
