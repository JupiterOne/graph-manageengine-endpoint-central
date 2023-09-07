import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

/**
 * @todo Implement entity
 */
export function createPatchEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'unique-id',
        name: 'Example',
      },
      assign: {
        _key: 'unique-id',
        _type: Entities.PATCH._type,
        _class: Entities.PATCH._class,
      },
    },
  });
}
