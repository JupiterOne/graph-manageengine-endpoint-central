import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';
import { createAPIClient } from '../../client';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test(
  Steps.FETCH_COMPUTERS,
  async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: Steps.FETCH_COMPUTERS,
    });
    const stepConfig = buildStepTestConfigForStep(Steps.FETCH_COMPUTERS);
    await createAPIClient(stepConfig.instanceConfig).verifyAuthentication();
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  },
  30_000,
);

test(
  Steps.RELATE_COMPUTER_TO_PATCHES,
  async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: Steps.RELATE_COMPUTER_TO_PATCHES,
    });
    const stepConfig = buildStepTestConfigForStep(
      Steps.RELATE_COMPUTER_TO_PATCHES,
    );
    await createAPIClient(stepConfig.instanceConfig).verifyAuthentication();
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  },
  30_000,
);
