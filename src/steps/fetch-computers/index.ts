/* eslint-disable @typescript-eslint/no-empty-function */
import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Steps, Entities } from '../constants';
import { getStepName } from '../../helpers';

/**
 * @todo Implement fetch
 */
export async function fetchComputers({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {}

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
