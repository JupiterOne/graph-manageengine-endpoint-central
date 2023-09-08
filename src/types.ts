export interface ZohoClientAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}

export interface EndpointCentralBaseResponse<T extends {}> {
  message_response: {
    total: number;
    limit: number;
    page: number;
  } & T;
  status: string;
  message_version: string;
  message_type: string;
}

export interface EndpointCentralComputer {
  remarks_args: string;
  search_tag: string;
  os_platform: number;
  location: string;
  agent_uninstalled_on: number;
  remarks: string;
  logged_on_users: string;
  live_status_update_time: number;
  kb_url: string;
  last_contact_time: number;
  service_pack: string;
  description: string;
  name: string;
  live_status: number;
  owner_email_id: string;
  customer_name: string;
  label: string;
  branch_office_name: string;
  last_sync_time: number;
  os_version: string;
  agent_installed_on: number;
  mac_address: string;
  installation_status: number;
  domain_netbios_name: string;
  resource_id: number;
  agent_version: string;
  ip_address: string;
  os_name: string;
  agent_executed_on: number;
  os_platform_name: string;
  owner: string;
  agent_upgraded_on: number;
  customer_id: number;
  full_name: string;
}

export interface EndpointCentralRemoteOffice {
  ds_status: string;
  error_code_kb_url: string;
  remarks: string;
  colorquality_type: number;
  agent_arc_loc: string;
  updated_time: string;
  has_masteragent: boolean;
  ds_port: string;
  // Looks like this could come back as boolean https://www.manageengine.com/products/desktop-central/api/api-som-remoteoffices.html#:~:text=%22has_masteragent%22%3A%20true%2C
  is_https: string;
  proxy_username: string;
  polling_int: string;
  last_contact_time: string;
  // Looks like this could come back as boolean https://www.manageengine.com/products/desktop-central/api/api-som-remoteoffices.html#:~:text=%22has_masteragent%22%3A%20true%2C
  is_proxy: string;
  branch_office_id: number;
  agent_comm_branch_office_id: string;
  ds_dns_name: string;
  ds_https_port: string;
  branch_office_customer_id: number;
  proxy_port_number: string;
  proxy_details_branch_office_id: string;
  error_kb_url: string;
  customer_name: string;
  compression_type: number;
  error_code: string;
  ds_version: string;
  managed_computers: number;
  proxy_server_name: string;
  branch_office_name: string;
  ds_sync_status: string;
  data_transfer_rate: string;
  resource_id: string;
  ds_ipaddress: string;
  branch_office_desc: string;
  resource_name: string;
  customer_id: number;
}

export interface EndpointCentralInstalledSoftware {
  sw_usage_type: string;
  sw_type: number;
  location: string;
  compliant_status: string;
  architecture: string;
  license_owner: string;
  total_copies: string;
  installed_date: number;
  software_version: string;
  domain: string;
  user_component_id: string;
  installed_users_login: string;
  installed_format: string;
  managed_sw_id: number;
  remaining_copies: string;
  managed_software_id: number;
  uninstall_status: string;
  uninstall_remarks: string;
  software_id: number;
  sw_category_name: string;
  manufacturer_name: string;
  user_name: string;
  manufacturer_id: number;
  software_name: string;
  is_usage_prohibited: number;
  detected_time: number;
  comments: string;
}

export interface EndpointCentralPatch {
  ro_failure_count: string;
  updated_time: number;
  installed: number;
  sqnumber: string;
  ro_yettodownload_count: string;
  bulletin_id: string;
  patch_noreboot: number;
  update_name: string;
  patch_released_time: number;
  patch_size: number;
  image_name: string;
  status_id: number;
  patch_uninstall_status: number;
  platform_name: string;
  missing: number;
  download_status: number;
  first_name: string;
  severity: number;
  patch_id: number;
  patch_name: string;
  patch_description: string;
  vendor_name: string;
  superceded_by: string;
  severity_name: string;
  label: string;
  failed: number;
  patch_supported_time: number;
  ro_success_count: string;
}

export interface EndpointCentralPatchDetails extends EndpointCentralPatch {
  branch_office_name: string;
  patch_updated_time: number;
  'resource.name': string;
  os_language: number;
  install_error_code: string;
  update_name: string;
  deploy_remarks: string;
  'resource.domain_netbios_name': string;
  service_pack: string;
  patch_type: number;
  'resource.resource_id': number;
  'pmseverity.name': string;
  patch_status: number;
  'collection.collection_name': string;
  'oslanguage.i18n': string;
  deployment_status: string;
  'resourcemacip.resource_id': number;
  ip_address: number;
  'deployer.first_name': string;
  agent_version: string;
  user_id: number;
  resource_id: number;
  os_name: string;
  deploy_remarks_args: string;
  installed_time: string;
}

export type EndpointCentralRemoteOfficesResponse = EndpointCentralBaseResponse<{
  remoteoffice: EndpointCentralRemoteOffice[];
}>;

export type EndpointCentralComputersResponse = EndpointCentralBaseResponse<{
  computers: EndpointCentralComputer[];
}>;

export type EndpointCentralInstalledSoftwaresResponse =
  EndpointCentralBaseResponse<{
    installedsoftware: EndpointCentralInstalledSoftware[];
  }>;

export type EndpointCentralPatchesResponse = EndpointCentralBaseResponse<{
  allpatches: EndpointCentralPatch[];
}>;

export type EndpointCentralPatchDetailsResponse = EndpointCentralBaseResponse<{
  allpatchdetails: EndpointCentralPatchDetails[];
}>;
