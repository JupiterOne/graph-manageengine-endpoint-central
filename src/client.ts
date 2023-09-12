import {
  IntegrationLogger,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import { Gaxios } from 'gaxios';
import {
  EndpointCentralComputer,
  EndpointCentralComputersResponse,
  EndpointCentralInstalledSoftware,
  EndpointCentralInstalledSoftwaresResponse,
  EndpointCentralPatch,
  EndpointCentralPatchDetails,
  EndpointCentralPatchDetailsResponse,
  EndpointCentralPatchesResponse,
  EndpointCentralRemoteOffice,
  EndpointCentralRemoteOfficesResponse,
  ZohoClientAuthTokenResponse,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  private _zohoGaxios: Gaxios;
  private _gaxios: Gaxios;
  private _verified: boolean = false;
  private logger?: IntegrationLogger;

  constructor(readonly config: IntegrationConfig, logger?: IntegrationLogger) {
    this.logger = logger;
    this._zohoGaxios = new Gaxios({
      timeout: 15_000, // 15 secs max
      baseURL: `https://${config.zohoAccountEndpoint}`,
    });
    this._gaxios = new Gaxios({
      timeout: 15_000, // 15 secs max
      baseURL: `https://${config.endpointCentralEndpoint}/api/1.4`,
      responseType: 'json',
    });
  }

  private async getAccessToken(refreshToken: string): Promise<string> {
    const { data, status, statusText } =
      await this._zohoGaxios.request<ZohoClientAuthTokenResponse>({
        url: '/oauth/v2/token',
        method: 'POST',
        params: {
          refresh_token: refreshToken,
          client_id: this.config.zohoClientId,
          client_secret: this.config.zohoClientSecret,
          grant_type: 'refresh_token',
        },
      });

    if (!data.access_token) {
      throw new IntegrationProviderAuthenticationError({
        endpoint: '/oauth/v2/token',
        cause: new Error('Access Token not returned by zoho auth'),
        status,
        statusText,
      });
    }

    return data.access_token;
  }

  public async verifyAuthentication(): Promise<void> {
    if (this._verified) return Promise.resolve();

    const accessToken = await this.getAccessToken(this.config.zohoRefreshToken);

    this._gaxios.defaults.headers = {
      ...this._gaxios.defaults.headers,
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    };

    this.logger?.info('Successfully authenticated');
    this._verified = true;
    return Promise.resolve();
  }

  public async iterateComputers(
    iteratee: ResourceIteratee<EndpointCentralComputer>,
  ): Promise<void> {
    const { data } =
      await this._gaxios.request<EndpointCentralComputersResponse>({
        method: 'GET',
        url: '/som/computers',
      });

    const computers = data.message_response.computers;

    for (const computer of computers) {
      await iteratee(computer);
    }
  }

  public async iterateRemoteOffices(
    iteratee: ResourceIteratee<EndpointCentralRemoteOffice>,
  ): Promise<void> {
    const { data } =
      await this._gaxios.request<EndpointCentralRemoteOfficesResponse>({
        method: 'GET',
        url: '/som/remoteoffice',
      });

    const remoteOffices = data.message_response.remoteoffice;

    for (const remoteOffice of remoteOffices) {
      await iteratee(remoteOffice);
    }
  }

  public async iterateInstalledSoftwareByComputer(
    computerResourceId: string,
    iteratee: ResourceIteratee<EndpointCentralInstalledSoftware>,
  ): Promise<void> {
    const { data } =
      await this._gaxios.request<EndpointCentralInstalledSoftwaresResponse>({
        method: 'GET',
        url: `/inventory/installedsoftware?resid=${computerResourceId}`,
      });

    const installedSoftwares = data.message_response.installedsoftware;

    for (const installedSoftware of installedSoftwares) {
      await iteratee(installedSoftware);
    }
  }

  public async iteratePatches(
    iteratee: ResourceIteratee<EndpointCentralPatch>,
  ): Promise<void> {
    const { data } = await this._gaxios.request<EndpointCentralPatchesResponse>(
      {
        method: 'GET',
        url: '/patch/allpatches',
      },
    );

    const patches = data.message_response.allpatches;

    for (const patch of patches) {
      await iteratee(patch);
    }
  }

  public async fetchPatchDetails(
    patchId: string,
  ): Promise<EndpointCentralPatchDetails> {
    const { data } =
      await this._gaxios.request<EndpointCentralPatchDetailsResponse>({
        method: 'GET',
        url: `/patch/allpatchdetails?patchid=${patchId}`,
      });
    return data.message_response.allpatchdetails[0];
  }
}

const API_CLIENTS = new Map<string, APIClient>();

export function createAPIClient(
  config: IntegrationConfig,
  logger?: IntegrationLogger,
): APIClient {
  const _key = config.zohoClientId;

  if (!API_CLIENTS.has(_key)) {
    API_CLIENTS.set(_key, new APIClient(config, logger));
  }

  return API_CLIENTS.get(_key)!;
}
