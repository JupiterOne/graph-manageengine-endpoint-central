/* eslint-disable @typescript-eslint/no-empty-function */
import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Steps, Entities } from '../constants';
import { getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createComputerEntity } from './converter';

/**
 * @todo Implement fetch
 */
export async function fetchComputers({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateComputers(async (computer) => {
    const computerEntity = createComputerEntity(computer);
    await jobState.addEntity(computerEntity);
  });
}

export const fetchComputersSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_COMPUTERS,
    name: getStepName(Steps.FETCH_COMPUTERS),
    entities: [Entities.COMPUTER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchComputers,
  },
];
