import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

/**
 * @todo Implement entity
 */
export function createComputerEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'unique-id',
        name: 'Example',
      },
      assign: {
        _key: 'unique-id',
        _type: Entities.COMPUTER._type,
        _class: Entities.COMPUTER._class,
      },
    },
  });
}
