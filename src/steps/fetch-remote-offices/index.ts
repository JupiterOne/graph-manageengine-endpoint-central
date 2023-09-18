import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { createRelationship, getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createRemoteOfficeEntity } from './converter';
import { getComputersFromJobState } from '../fetch-computers';
import { getPatchesFromJobState } from '../fetch-patches';

export async function fetchRemoteOffices({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const { config } = instance;

  const client = createAPIClient(config, logger);

  await client.iterateRemoteOffices(async (remoteOffice) => {
    await jobState.addEntity(createRemoteOfficeEntity(remoteOffice));
  });
}

export async function relateRemoteOfficeToComputers({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const computerEntities = await getComputersFromJobState(jobState);
  await jobState.iterateEntities(
    Entities.REMOTE_OFFICE,
    async (remoteOfficeEntity) => {
      const remoteOfficeName = remoteOfficeEntity.displayName;
      if (remoteOfficeName) {
        const remoteOfficeComputerEntities = computerEntities.filter(
          (computerEntity) => computerEntity.officeName === remoteOfficeName,
        );
        for (const computerEntity of remoteOfficeComputerEntities) {
          await jobState.addRelationship(
            createRelationship({
              relationship: Relationships.REMOTE_OFFICE_HAS_COMPUTER,
              from: remoteOfficeEntity,
              to: computerEntity,
            }),
          );
        }
      }
    },
  );
}

export async function relateRemoteOfficeToPatches({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const patchEntities = await getPatchesFromJobState(jobState);
  await jobState.iterateEntities(
    Entities.REMOTE_OFFICE,
    async (remoteOfficeEntity) => {
      const remoteOfficeName = remoteOfficeEntity.displayName;
      if (remoteOfficeName) {
        const remoteOfficePatchEntities = patchEntities.filter(
          (patchEntity) => patchEntity.officeName === remoteOfficeName,
        );
        for (const patchEntity of remoteOfficePatchEntities) {
          await jobState.addRelationship(
            createRelationship({
              relationship: Relationships.REMOTE_OFFICE_ENFORCES_PATCH,
              from: remoteOfficeEntity,
              to: patchEntity,
            }),
          );
        }
      }
    },
  );
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
  {
    id: Steps.RELATE_REMOTE_OFFICE_TO_COMPUTERS,
    name: getStepName(Steps.RELATE_REMOTE_OFFICE_TO_COMPUTERS),
    entities: [],
    relationships: [Relationships.REMOTE_OFFICE_HAS_COMPUTER],
    dependsOn: [Steps.FETCH_COMPUTERS, Steps.FETCH_REMOTE_OFFICES],
    executionHandler: relateRemoteOfficeToComputers,
  },
  {
    id: Steps.RELATE_REMOTE_OFFICE_TO_PATCHES,
    name: getStepName(Steps.RELATE_REMOTE_OFFICE_TO_PATCHES),
    entities: [],
    relationships: [Relationships.REMOTE_OFFICE_ENFORCES_PATCH],
    dependsOn: [Steps.FETCH_PATCHES, Steps.FETCH_REMOTE_OFFICES],
    executionHandler: relateRemoteOfficeToPatches,
  },
];
