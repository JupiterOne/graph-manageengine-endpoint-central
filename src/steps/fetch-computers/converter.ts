import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { EndpointCentralComputer } from '../../types';

/**
 * @todo Implement entity
 */
export function createComputerEntity(
  computer: EndpointCentralComputer,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: computer,
      assign: {
        _key: getComputerEntityKey(computer),
        _type: Entities.COMPUTER._type,
        _class: Entities.COMPUTER._class,
        /**
         * note: most of these properties were inspired by other integrations
         * and may be overkill.
         */
        id: computer.resource_id.toString(),
        displayName: parseProperty(computer.resource_name),
        name: parseProperty(computer.full_name),
        category: 'endpoint',
        make: null,
        model: null,
        version: 'Unknown',
        serial: null,
        deviceId: parseProperty(computer.resource_id).toString(),
        hardwareVendor: 'Unknown',
        hardwareModel: 'Unknown',
        hardwareVersion: 'Unknown',
        hardwareSerial: 'Unknown',
        assetTag: 'Unknown',
        status: getComputerStatus(computer),
        osDetails: parseProperty(computer.os_name),
        macAddress: parseProperty(computer.mac_address).split(','),
        systemVersion: parseProperty(computer.service_pack),
        ipAddresses: parseProperty(computer.ip_address).split(','),
        osName: parseProperty(computer.os_name),
        hostname: parseProperty(computer.resource_name),
        deviceName: parseProperty(computer.resource_name),
        lastSeenOn: parseTimePropertyValue(new Date(computer.last_sync_time)),
        officeName: parseProperty(computer.branch_office_name),
        osVersion: parseProperty(computer.os_version),
        agentVersion: parseProperty(computer.agent_version),
        platform: getComputerPlatform(computer),
      },
    },
  });
}

const getComputerStatus = (computer: EndpointCentralComputer) => {
  switch (computer.installation_status) {
    case 21:
      return 'pending';
    case 22:
      return 'ready';
    default:
      return 'other';
  }
};

const getComputerPlatform = (computer: EndpointCentralComputer) => {
  const platform = parseProperty(computer.os_platform_name).toLowerCase();
  switch (platform) {
    case 'mac':
      return 'darwin';
    default:
      return platform;
  }
};

const parseProperty = <T extends string | number>(property: T) => {
  return property === '--' ? 'Unknown' : property;
};

const getComputerEntityKey = (computer: EndpointCentralComputer) => {
  return `${Entities.COMPUTER._type}:${computer.resource_id}`;
};
