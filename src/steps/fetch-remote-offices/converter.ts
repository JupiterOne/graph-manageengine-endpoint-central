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
  return createIntegrationEntity({
    entityData: {
      source: remoteOffice,
      assign: {
        _key: createEntityKey(
          Entities.REMOTE_OFFICE,
          remoteOffice.branch_office_id,
        ),
        _type: Entities.REMOTE_OFFICE._type,
        _class: Entities.REMOTE_OFFICE._class,
        id: remoteOffice.branch_office_id,
        remoteOfficeId: remoteOffice.branch_office_id,
        name: remoteOffice.branch_office_name,
        displayName: remoteOffice.branch_office_name,
        description: remoteOffice.branch_office_desc,
        mangedComputerCount: remoteOffice.managed_computers,
      },
    },
  });
}
