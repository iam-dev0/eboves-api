import Joi from "@hapi/joi";

// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from "dotenv";

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number().default(4040),
  DATABASE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),


  DEFAULT_BUCKET_NAME: Joi.string(),
  GOOGLE_CLOUD_PROJECT_ID:Joi.string(),

  DEV_DATABASE_NAME: Joi.string(),
  DEV_DATABASE_USER: Joi.string(),
  DEV_DATABASE_PASSWORD: Joi.string(),
  DEV_DATABASE_HOST: Joi.string(),
  DEV_DATABASE_PORT: Joi.number().default(3306),

  TEST_DATABASE_NAME: Joi.string(),
  TEST_DATABASE_USER: Joi.string(),
  TEST_DATABASE_PASSWORD: Joi.string(),
  TEST_DATABASE_HOST: Joi.string(),
  TEST_DATABASE_PORT: Joi.number().default(3306),

  PRO_DATABASE_NAME: Joi.string(),
  PRO_DATABASE_USER: Joi.string(),
  PRO_DATABASE_PASSWORD: Joi.string(),
  PRO_DATABASE_HOST: Joi.string(),
  PRO_DATABASE_PORT: Joi.number().default(3306),

})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


interface DbInfo {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

const envBasedDatabase = (): DbInfo => {
  switch (envVars.env) {
    case "development":
      return {
        name: envVars.DEV_DATABASE_NAME,
        user: envVars.DEV_DATABASE_USER,
        password: envVars.DEV_DATABASE_PASSWORD,
        host: envVars.DEV_DATABASE_HOST,
        port: envVars.DEV_DATABASE_PORT
      };
    case "production":
      return {
        name: envVars.PRO_DATABASE_NAME,
        user: envVars.PRO_DATABASE_USER,
        password: envVars.PRO_DATABASE_PASSWORD,
        host: envVars.PRO_DATABASE_HOST,
        port: envVars.PRO_DATABASE_PORTPRO
      };
    case "test":
      return {
        name: envVars.TEST_DATABASE_NAME,
        user: envVars.TEST_DATABASE_USER,
        password: envVars.TEST_DATABASE_PASSWORD,
        host: envVars.TEST_DATABASE_HOST,
        port: envVars.TEST_DATABASE_PORT
      };
    default:
      return {
        name: envVars.DEV_DATABASE_NAME,
        user: envVars.DEV_DATABASE_USER,
        password: envVars.DEV_DATABASE_PASSWORD,
        host: envVars.DEV_DATABASE_HOST,
        port: envVars.DEV_DATABASE_PORT
      };
  }
};


export const databaseInfo: DbInfo = envBasedDatabase();






const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysqlDebug: envVars.DATABASE_DEBUG,
  googleCloudProjectID: envVars.GOOGLE_CLOUD_PROJECT_ID,
  bucketName: envVars.DEFAULT_BUCKET_NAME,
  devDatabase: {
    name: envVars.DEV_DATABASE_NAME,
    user: envVars.DEV_DATABASE_USER,
    password: envVars.DEV_DATABASE_PASSWORD,
    host: envVars.DEV_DATABASE_HOST,
    port: envVars.DEV_DATABASE_PORT
  },
  testDatabase: {
    name: envVars.TEST_DATABASE_NAME,
    user: envVars.TEST_DATABASE_USER,
    password: envVars.TEST_DATABASE_PASSWORD,
    host: envVars.TEST_DATABASE_HOST,
    port: envVars.TEST_DATABASE_PORT
  },
  proDatabase: {
    name: envVars.PRO_DATABASE_NAME,
    user: envVars.PRO_DATABASE_USER,
    password: envVars.PRO_DATABASE_PASSWORD,
    host: envVars.PRO_DATABASE_HOST,
    port: envVars.PRO_DATABASE_PORTPRO
  }
};

export default config;
