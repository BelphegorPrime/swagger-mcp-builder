import assert from 'assert';
import { describe, it } from 'node:test';
import { isValidOpenAPIVersion } from '../../src/models/versionField.js';

describe("OpenAPI Quickstart Scenario", () => {
  it("validates a quickstart OpenAPI file version", () => {
    assert.strictEqual(isValidOpenAPIVersion("3.1.0"), true);
  });
});
