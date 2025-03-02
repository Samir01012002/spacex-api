import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;

  DYNAMODB_TABLE: string;

  SPACEX_API: string;
}

const envsSchema = joi
  .object({
    AWS_ACCESS_KEY_ID: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_REGION: joi.string().required(),

    DYNAMODB_TABLE: joi.string().required(),

    SPACEX_API: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  aws_access_key_id: envVars.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: envVars.AWS_SECRET_ACCESS_KEY,
  aws_region: envVars.AWS_REGION,
  dynamodb_table: envVars.DYNAMODB_TABLE,
  spacex_api: envVars.SPACEX_API,
};
