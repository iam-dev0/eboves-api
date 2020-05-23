import { Sequelize } from "sequelize-typescript";
import { databaseInfo } from "../config";


const sequelize = new Sequelize({
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8",
        multipleStatements: true
    },
    port: databaseInfo.port,
    username: databaseInfo.user,
    password: databaseInfo.password,
    database: databaseInfo.name,
    timezone: "+00:00",
    pool: {
        max: 100,
        min: 0
    },
    logging: (...msg) => console.log(msg),
    models: [__dirname + "./../models"]
});


sequelize.authenticate().then(() => console.log("connected")).catch(e => console.error(e));
export default sequelize;