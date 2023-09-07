import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

/**
 * @todo Implement entity
 */
export function createRemoteOfficeEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'unique-id',
        name: 'Example',
      },
      assign: {
        _key: 'unique-id',
        _type: Entities.REMOTE_OFFICE._type,
        _class: Entities.REMOTE_OFFICE._class,
      },
    },
  });
}
