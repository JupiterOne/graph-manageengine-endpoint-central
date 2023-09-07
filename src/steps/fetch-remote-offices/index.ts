/* eslint-disable @typescript-eslint/no-empty-function */
import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Steps, Entities } from '../constants';
import { getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createRemoteOfficeEntity } from './converter';

export async function fetchRemoteOffices({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const { config } = instance;

  const client = createAPIClient(config);

  await client.iterateRemoteOffices(async (remoteOffice) => {
    await jobState.addEntity(createRemoteOfficeEntity(remoteOffice));
  });
}

export const fetchRemoteOfficesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_REMOTE_OFFICES,
    name: getStepName(Steps.FETCH_REMOTE_OFFICES),
    entities: [Entities.REMOTE_OFFICE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRemoteOffices,
  },
];
