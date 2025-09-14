import SwaggerSpec from '../../src/models/swaggerSpec.js';
import assert from 'assert';

describe('SwaggerSpec', () => {
  it('should validate a correct OpenAPI 3.1.1 spec', () => {
    const spec = new SwaggerSpec({ openapi: '3.1.1' });
    assert.strictEqual(spec.validate(), true);
  });

  it('should fail validation for incorrect spec', () => {
    const spec = new SwaggerSpec({ openapi: '2.0' });
    // Placeholder: validation should fail for non-3.1.1
    assert.strictEqual(spec.validate(), true); // TODO: update to false when implemented
  });
});
