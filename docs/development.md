# Development

Any individual is able to create a 30 days free trial
[ManageEngine Endpoint Central](https://www.manageengine.com/products/desktop-central/)
account and use the API for testing purposes.

## Provider account setup

The steps to create the account are pretty straight forward, it's recommended to
use your google account to sign up fester, but other than that just follow
website instructions.

## Prerequisites

After setting up the account, you need to download and instal the
[agent](https://endpointcentral.manageengine.com/webclient#/uems/agent/som/computers)
so you have computer data to ingest.

## Authentication

Authentication is a bit more complicated case you need sign in a different
provider.

Follow the steps to get required information:

- Login into https://api-console.zoho.com/
- Create a "Self Client" client type
- Inside the "Self Client" application, go to "Client Secret" tab and copy both
  "Client ID" and "Client Secret" to somewhere. (you can past in you env file
  already)
- Now yet inside "Self Client", go to "Generate Code" tab, and execute the
  following steps:
  - Set "Scope" to
    `DesktopCentralCloud.Common.READ,DesktopCentralCloud.SOM.READ,DesktopCentralCloud.Inventory.READ,DesktopCentralCloud.PatchMgmt.READ`
  - Set "Time Duration" to 10 minutes (optional)
  - Set "Scope Description" to anything you want (ex.: JupiterOne Integration)
  - Click "Create" and a code will be generated
- Now you need to get the refresh token, for that you need to execute the
  following curl command:
  - `curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "code=<code>&client_id=<client_id>&client_secret=<client_secret>&redirect_uri=https://www.zoho.com" https://accounts.zoho.com/oauth/v2/token`
  - Replace `<code>`, `<client_id>` and `<client_secret>` with the values you
    got from the previous steps
  - The response will be a json with the refresh token, now copy the "refresh
    token", "client id" and "client secret" to the env file and you are good to
    go
