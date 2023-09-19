import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';
import { generateRelationshipMetadata } from '../helpers';

const INTEGRATION_NAME = 'manageengine';

export const Steps = {
  FETCH_REMOTE_OFFICES: 'fetch-remote-offices',
  FETCH_COMPUTERS: 'fetch-computers',
  FETCH_SOFTWARE: 'fetch-software',
  FETCH_PATCHES: 'fetch-patches',
  RELATE_REMOTE_OFFICE_TO_COMPUTERS: 'relate-remote-office-to-computers',
  RELATE_REMOTE_OFFICE_TO_PATCHES: 'relate-remote-office-to-patches',
  RELATE_COMPUTER_TO_PATCHES: 'relate-computer-to-patches',
} satisfies Record<string, `fetch-${string}` | `relate-${string}-to-${string}`>;

export const Entities = {
  COMPUTER: {
    resourceName: 'Computer',
    _type: `${INTEGRATION_NAME}_computer`,
    _class: ['Device'],
  },
  REMOTE_OFFICE: {
    resourceName: 'RemoteOffice',
    _type: `${INTEGRATION_NAME}_remote_office`,
    _class: ['Group'],
  },
  SOFTWARE: {
    resourceName: 'Software',
    _type: `${INTEGRATION_NAME}_software`,
    _class: ['Application'],
  },
  PATCH: {
    resourceName: 'Patch',
    _type: `${INTEGRATION_NAME}_patch`,
    _class: ['Finding'],
  },
} satisfies Record<string, StepEntityMetadata>;

export const Relationships = {
  COMPUTER_INSTALLED_SOFTWARE: generateRelationshipMetadata({
    from: Entities.COMPUTER,
    _class: RelationshipClass.INSTALLED,
    to: Entities.SOFTWARE,
  }),
  REMOTE_OFFICE_HAS_COMPUTER: generateRelationshipMetadata({
    from: Entities.REMOTE_OFFICE,
    _class: RelationshipClass.HAS,
    to: Entities.COMPUTER,
  }),
  COMPUTER_HAS_PATCH: generateRelationshipMetadata({
    from: Entities.COMPUTER,
    _class: RelationshipClass.HAS,
    to: Entities.PATCH,
  }),
  REMOTE_OFFICE_ENFORCES_PATCH: generateRelationshipMetadata({
    from: Entities.REMOTE_OFFICE,
    _class: RelationshipClass.ENFORCES,
    to: Entities.PATCH,
  }),
} satisfies Record<string, StepRelationshipMetadata>;
