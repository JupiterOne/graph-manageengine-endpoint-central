import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  JobState,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { Steps, Entities } from '../constants';
import { getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createPatchEntity, getPatchId } from './converter';

export async function fetchPatches({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const { config } = instance;
  const client = createAPIClient(config, logger);
  await client.iteratePatches(async (patch) => {
    // get specific patch details
    const patchDetails = await client.fetchPatchDetails(getPatchId(patch));
    await jobState.addEntity(createPatchEntity(patchDetails));
  });
}

export const getPatchesFromJobState = async (jobState: JobState) => {
  const patches: Entity[] = [];
  await jobState.iterateEntities(Entities.PATCH, (patchEntity) => {
    patches.push(patchEntity);
  });
  return patches;
};

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
