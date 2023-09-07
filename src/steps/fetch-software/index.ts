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
export async function fetchSoftware({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {}

export const fetchSoftwareSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_SOFTWARE,
    name: getStepName(Steps.FETCH_SOFTWARE),
    entities: [Entities.SOFTWARE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchSoftware,
  },
];
