// CLI command to validate OpenAPI files (v3+)
import fs from 'fs';
import { SwaggerValidator } from '../services/swaggerValidator.js';

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node validateOpenapi.js <openapi.yaml|json>');
    process.exit(1);
  }

  let spec;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    spec = JSON.parse(fileContent); // Assumes JSON for simplicity
  } catch (err) {
    console.error('Failed to read or parse OpenAPI file:', err);
    process.exit(1);
  }

  if (SwaggerValidator.validate(spec)) {
    console.log('OpenAPI file validated. Version:', spec.openapi);
    process.exit(0);
  } else {
    console.error('OpenAPI file validation failed.');
    process.exit(1);
  }
}

main();
