import packageJson from '../package.json';
import { GORILLA_VERSION } from './version';

describe('GORILLA_VERSION', () => {
  it('matches the version of the library package.json', () => {
    expect(GORILLA_VERSION).toBe(packageJson.version);
  });
});
