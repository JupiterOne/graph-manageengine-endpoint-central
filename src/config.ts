import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields = {
  endpointCentralEndpoint: {
    type: 'string',
    mask: false,
  },
  zohoAccountEndpoint: {
    type: 'string',
    mask: false,
  },
  zohoClientId: {
    type: 'string',
    mask: false,
  },
  zohoClientSecret: {
    type: 'string',
    mask: true,
  },
  zohoRefreshToken: {
    type: 'string',
    mask: true,
  },
} satisfies IntegrationInstanceConfigFieldMap;

export interface IntegrationConfig {
  endpointCentralEndpoint: string;
  zohoAccountEndpoint: string;
  zohoClientId: string;
  zohoClientSecret: string;
  zohoRefreshToken: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (
    !config.endpointCentralEndpoint ||
    !config.zohoAccountEndpoint ||
    !config.zohoClientId ||
    !config.zohoClientSecret ||
    !config.zohoRefreshToken
  ) {
    throw new IntegrationValidationError(
      'Config requires all of endpointCentralEndpoint,zohoAccountEndpoint,zohoClientId,zohoClientSecret,zohoRefreshToken',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
