const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  TWITTER_BEARER: Joi.string().required()
    .description('Twitter API Bearer token'),
  TWITTER_CONSUMER_KEY: Joi.string().required()
    .description('Twitter API Key'),
  TWITTER_CONSUMER_SECRET: Joi.string().required()
    .description('Twitter API Secret'),
  TWITTER_ACCESS_TOKEN: Joi.string().required()
    .description('Twitter predictit_scout Access Token'),
  TWITTER_ACCESS_TOKEN_SECRET: Joi.string().required()
    .description('Twitter predictit_scout Access Token Secret'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  twitterBearer: envVars.TWITTER_BEARER,
  twitterConsumerKey: envVars.TWITTER_CONSUMER_KEY,
  twitterConsumerKeySecret: envVars.TWITTER_CONSUMER_SECRET,
  twitterAccessToken: envVars.TWITTER_ACCESS_TOKEN,
  twitterAccessTokenSecret: envVars.TWITTER_ACCESS_TOKEN_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
};

module.exports = config;
