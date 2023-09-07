import { getStepName } from './helpers';
import { Steps } from './steps/constants';
describe('helpers', () => {
  test('should get correct step name', () => {
    expect(getStepName(Steps.FETCH_COMPUTERS)).toEqual('Fetch computers');
  });
});
