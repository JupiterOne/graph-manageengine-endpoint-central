import { fetchComputersSteps } from './fetch-computers';
import { fetchPatchesSteps } from './fetch-patches';
import { fetchRemoteOfficesSteps } from './fetch-remote-offices';

const integrationSteps = [
  ...fetchComputersSteps,
  ...fetchPatchesSteps,
  ...fetchRemoteOfficesSteps,
];

export { integrationSteps };
