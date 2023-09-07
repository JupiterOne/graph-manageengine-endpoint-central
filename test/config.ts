import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

const DEFAULT_ENDPOINT_CENTRAL_ENDPOINT =
  'https://endpointcentral.manageengine.com';
const DEFAULT_ZOHO_CLIENT_ID = 'dummy-client-id';
const DEFAULT_ZOHO_CLIENT_SECRET = 'dummy-client-secret';
const DEFAULT_ZOHO_REFRESH_TOKEN = 'dummy-client-refresh-token';
const DEFAULT_ZOHO_ACCOUNT_ENDPOINT = 'https://accounts.zoho.com	';

export const integrationConfig: IntegrationConfig = {
  endpointCentralEndpoint:
    process.env.ENDPOINT_CENTRAL_ENDPOINT || DEFAULT_ENDPOINT_CENTRAL_ENDPOINT,
  zohoAccountEndpoint:
    process.env.ZOHO_ACCOUNT_ENDPOINT || DEFAULT_ZOHO_ACCOUNT_ENDPOINT,
  zohoClientId: process.env.ZOHO_CLIENT_ID || DEFAULT_ZOHO_CLIENT_ID,
  zohoClientSecret:
    process.env.ZOHO_CLIENT_SECRET || DEFAULT_ZOHO_CLIENT_SECRET,
  zohoRefreshToken:
    process.env.ZOHO_REFRESH_TOKEN || DEFAULT_ZOHO_REFRESH_TOKEN,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
