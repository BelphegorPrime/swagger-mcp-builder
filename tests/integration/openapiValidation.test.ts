import assert from 'assert';
import { describe, it } from 'node:test';
import { isValidOpenAPIVersion } from '../../src/models/versionField.js';
import { spawnSync } from 'child_process';
import fs from 'fs';

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

  it("shows error when openapi.yaml is missing", () => {
    // Temporarily rename openapi.yaml if it exists
    const yamlPath = 'openapi.yaml';
    const backupPath = 'openapi.yaml.bak';
    let renamed = false;
    if (fs.existsSync(yamlPath)) {
      fs.renameSync(yamlPath, backupPath);
      renamed = true;
    }
    const result = spawnSync('npm', ['run', 'dev'], { encoding: 'utf-8' });
    assert.notStrictEqual(result.status, 0, 'npm run dev should fail if openapi.yaml is missing');
    assert.match(result.stderr + result.stdout, /error|missing|not found/i, 'Output should mention missing file error');
    // Restore file
    if (renamed) {
      fs.renameSync(backupPath, yamlPath);
    }
  });

  it("shows error when openapi.yaml is invalid", () => {
    const yamlPath = 'openapi.yaml';
    const backupPath = 'openapi.yaml.bak';
    let restored = false;
    if (fs.existsSync(yamlPath)) {
      fs.renameSync(yamlPath, backupPath);
      restored = true;
    }
    // Write invalid YAML
    fs.writeFileSync(yamlPath, 'invalid: : : yaml');
    const result = spawnSync('npm', ['run', 'dev'], { encoding: 'utf-8' });
    assert.notStrictEqual(result.status, 0, 'npm run dev should fail if openapi.yaml is invalid');
    assert.match(result.stderr + result.stdout, /error|invalid|yaml/i, 'Output should mention invalid YAML error');
    // Restore file
    if (restored) {
      fs.unlinkSync(yamlPath);
      fs.renameSync(backupPath, yamlPath);
    } else {
      fs.unlinkSync(yamlPath);
    }
  });
});
