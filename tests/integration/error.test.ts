import { execSync } from 'child_process';
import fs from 'fs';
import assert from 'assert';
import path from 'path';

describe('Integration: Error handling for invalid swagger.json', () => {
  const swaggerPath = path.join(__dirname, 'invalid-swagger.json');
  const invalidSpec = {
    openapi: '2.0', // Invalid version
    info: { title: 'Test API', version: '1.0.0' },
    paths: {}
  };

  before(() => {
    fs.writeFileSync(swaggerPath, JSON.stringify(invalidSpec));
  });

  after(() => {
    fs.unlinkSync(swaggerPath);
  });

  it('should fail and print error for invalid spec', () => {
    try {
      execSync(`node dist/cli/generate.js ${swaggerPath}`, { encoding: 'utf-8' });
      assert.fail('Expected process to exit with error');
    } catch (err: any) {
      assert.match(err.stdout || err.message, /Invalid OpenAPI 3.1.1 specification/);
    }
  });
});
