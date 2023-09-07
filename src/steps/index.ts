import { fetchComputersSteps } from './fetch-computers';
import { fetchPatchesSteps } from './fetch-patches';
import { fetchRemoteOfficesSteps } from './fetch-remote-offices';
import { fetchSoftwareSteps } from './fetch-software';

const integrationSteps = [
  ...fetchComputersSteps,
  ...fetchPatchesSteps,
  ...fetchRemoteOfficesSteps,
  ...fetchSoftwareSteps,
];

export { integrationSteps };
