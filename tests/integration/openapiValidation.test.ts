import assert from 'assert';
import { describe, it } from 'node:test';
import { isValidOpenAPIVersion } from '../../src/models/versionField.js';

describe("OpenAPI Version Validation", () => {
  it("accepts valid v3+ version", () => {
    assert.strictEqual(isValidOpenAPIVersion("3.0.0"), true);
    assert.strictEqual(isValidOpenAPIVersion("3.1.0"), true);
    assert.strictEqual(isValidOpenAPIVersion("4.0.0"), true);
  });

  it("rejects v2 version", () => {
    assert.strictEqual(isValidOpenAPIVersion("2.0.0"), false);
  });

  it("rejects malformed or missing version", () => {
    assert.strictEqual(isValidOpenAPIVersion(""), false);
    assert.strictEqual(isValidOpenAPIVersion("not-a-version"), false);
    assert.strictEqual(isValidOpenAPIVersion("3"), false);
  });
});
