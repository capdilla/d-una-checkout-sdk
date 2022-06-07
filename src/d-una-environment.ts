import { urls } from './endpoints';

export enum Environment {
  Production = 'production',
  Staging = 'staging'
}

export const envs = {
  [Environment.Production]: urls.APIGW_PROD_URL,
  [Environment.Staging]: urls.APIGW_STAGING_URL
};
