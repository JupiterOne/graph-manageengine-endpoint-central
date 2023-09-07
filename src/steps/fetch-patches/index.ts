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
export async function fetchPatches({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {}

export const fetchPatchesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_PATCHES,
    name: getStepName(Steps.FETCH_PATCHES),
    entities: [Entities.PATCH],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchPatches,
  },
];
