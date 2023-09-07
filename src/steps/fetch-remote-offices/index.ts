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
export async function fetchRemoteOffices({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {}

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
