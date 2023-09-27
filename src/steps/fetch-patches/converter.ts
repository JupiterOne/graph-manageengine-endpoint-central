import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { EndpointCentralPatch, EndpointCentralPatchDetails } from '../../types';
import { createEntityKey } from '../../helpers';

export function createPatchEntity(patch: EndpointCentralPatchDetails): Entity {
  const patchId = getPatchId(patch);
  const patchName = getPatchName(patch);
  const severityNumber = getPatchSeverityNumber(patch);
  const branchOfficeName = getPatchOfficeName(patch);
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
        name: patchName,
        displayName: patchName,
        description: patch.patch_description,
        severity: patch['pmseverity.name'],
        numericSeverity: severityNumber,
        category: 'endpoint',
        open: patch.failed > 0 || patch.missing > 0,
        vendorName: patch.vendor_name,
        officeName: branchOfficeName,
      },
    },
  });
}

export const getPatchSeverityNumber = (
  patch: EndpointCentralPatchDetails | EndpointCentralPatch,
) => {
  return Number(patch.severity ?? patch['patch.severityid']);
};

export const getPatchName = (
  patch: EndpointCentralPatchDetails | EndpointCentralPatch,
) => {
  return String(patch.patch_name ?? patch['pmpatchlocation.patchname']);
};

export const getPatchId = (
  patch: EndpointCentralPatchDetails | EndpointCentralPatch,
) => {
  return String(patch.patch_id ?? patch['patch.patchid']);
};

export const getPatchOfficeName = (patch: EndpointCentralPatchDetails) => {
  return String(
    patch.branch_office_name ?? patch['branchofficedetails.branch_office_name'],
  );
};
