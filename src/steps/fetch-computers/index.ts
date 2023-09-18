import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  JobState,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { createRelationship, getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createComputerEntity } from './converter';
import { getPatchesFromJobState } from '../fetch-patches';

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

export async function relateComputersToPatches({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const patchesEntities = await getPatchesFromJobState(jobState);
  await jobState.iterateEntities(Entities.COMPUTER, async (computerEntity) => {
    const remoteOfficeName = computerEntity.officeName;
    if (remoteOfficeName) {
      const computerPatchesEntities = patchesEntities.filter(
        (patchEntity) => patchEntity.officeName === remoteOfficeName,
      );
      for (const patchEntity of computerPatchesEntities) {
        await jobState.addRelationship(
          createRelationship({
            relationship: Relationships.COMPUTER_HAS_PATCH,
            from: computerEntity,
            to: patchEntity,
          }),
        );
      }
    }
  });
}

export const getComputersFromJobState = async (jobState: JobState) => {
  const computers: Entity[] = [];
  await jobState.iterateEntities(Entities.COMPUTER, (computerEntity) => {
    computers.push(computerEntity);
  });
  return computers;
};

export const fetchComputersSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_COMPUTERS,
    name: getStepName(Steps.FETCH_COMPUTERS),
    entities: [Entities.COMPUTER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchComputers,
  },
  {
    id: Steps.RELATE_COMPUTER_TO_PATCHES,
    name: getStepName(Steps.RELATE_COMPUTER_TO_PATCHES),
    entities: [],
    relationships: [Relationships.COMPUTER_HAS_PATCH],
    dependsOn: [Steps.FETCH_COMPUTERS, Steps.FETCH_PATCHES],
    executionHandler: relateComputersToPatches,
  },
];
