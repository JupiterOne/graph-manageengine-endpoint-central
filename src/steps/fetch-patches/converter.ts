import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { EndpointCentralPatchDetails } from '../../types';
import { createEntityKey } from '../../helpers';

export function createPatchEntity(patch: EndpointCentralPatchDetails): Entity {
  const patchId = String(patch.patch_id);
  return createIntegrationEntity({
    entityData: {
      source: patch,
      assign: {
        _key: createEntityKey(Entities.PATCH, patchId),
        _type: Entities.PATCH._type,
        _class: Entities.PATCH._class,
        id: patchId,
        patchId,
        // ex: "SQLPreReqHandler_KB4057116_x64.exe"
        name: patch.patch_name,
        displayName: patch.patch_name,
        description: patch.patch_description,
        severity: patch['pmseverity.name'],
        numericSeverity: patch.severity,
        category: 'endpoint',
        open: patch.failed > 0 || patch.missing > 0,
        vendorName: patch.vendor_name,
        officeName: patch.branch_office_name,
      },
    },
  });
}
