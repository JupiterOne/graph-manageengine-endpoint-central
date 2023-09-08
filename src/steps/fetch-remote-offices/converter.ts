import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { EndpointCentralRemoteOffice } from '../../types';
import { createEntityKey } from '../../helpers';

export function createRemoteOfficeEntity(
  remoteOffice: EndpointCentralRemoteOffice,
): Entity {
  const branchId = String(remoteOffice.branch_office_id);
  return createIntegrationEntity({
    entityData: {
      source: remoteOffice,
      assign: {
        _key: createEntityKey(Entities.REMOTE_OFFICE, branchId),
        _type: Entities.REMOTE_OFFICE._type,
        _class: Entities.REMOTE_OFFICE._class,
        id: branchId,
        remoteOfficeId: branchId,
        name: remoteOffice.branch_office_name,
        displayName: remoteOffice.branch_office_name,
        description: remoteOffice.branch_office_desc,
        mangedComputerCount: remoteOffice.managed_computers,
      },
    },
  });
}
