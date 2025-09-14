import DockerContainer from '../../src/models/dockerContainer.js';
import assert from 'assert';

describe('DockerContainer', () => {
  it('should generate a Docker container from config', () => {
    const container = new DockerContainer({});
    assert.strictEqual(container.generate(), true);
  });
});
