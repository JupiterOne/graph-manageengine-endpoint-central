/* eslint-disable @typescript-eslint/no-empty-function */
import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { getStepName } from '../../helpers';
import { createAPIClient } from '../../client';
import { createPatchEntity } from './converter';

export async function fetchPatches({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const { config } = instance;
  const client = createAPIClient(config, logger);
  await client.iteratePatches(async (patch) => {
    // get specific patch details
    const patchDetails = await client.fetchPatchDetails(String(patch.patch_id));

    const patchEntity = await jobState.addEntity(
      createPatchEntity(patchDetails),
    );

    // get the related remote office
    let remoteOfficeEntityForPatch;
    await jobState.iterateEntities(
      Entities.REMOTE_OFFICE,
      (remoteOfficeEntity) => {
        if (
          remoteOfficeEntity.displayName === patchDetails.branch_office_name
        ) {
          remoteOfficeEntityForPatch = remoteOfficeEntity;
        }
      },
    );

    // create relationship between remote office and patch
    if (remoteOfficeEntityForPatch) {
      await jobState.addRelationship(
        createDirectRelationship({
          from: remoteOfficeEntityForPatch,
          to: patchEntity,
          _class: Relationships.REMOTE_OFFICE_ENFORCES_PATCH._class,
        }),
      );
    }
  });
}

export const fetchPatchesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FETCH_PATCHES,
    name: getStepName(Steps.FETCH_PATCHES),
    entities: [Entities.PATCH],
    relationships: [Relationships.REMOTE_OFFICE_ENFORCES_PATCH],
    dependsOn: [Steps.FETCH_REMOTE_OFFICES],
    executionHandler: fetchPatches,
  },
];
