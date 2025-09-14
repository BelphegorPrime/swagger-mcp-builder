// CLI command to trigger MCP server Docker generation
import { SwaggerValidator } from '../services/swaggerValidator.js';
import { DockerGenerator } from '../services/dockerGenerator.js';
import { SwaggerSpec } from '../models/swaggerSpec.js';
import fs from 'fs';

async function main() {
  const swaggerPath = process.argv[2];
  if (!swaggerPath) {
    console.error('Usage: node generate.js <swagger.json>');
    process.exit(1);
  }

  let spec;
  try {
    const fileContent = fs.readFileSync(swaggerPath, 'utf-8');
    spec = JSON.parse(fileContent); // Assumes JSON for simplicity
  } catch (err) {
    console.error('Failed to read or parse swagger file:', err);
    process.exit(1);
  }

  const swagger = new SwaggerSpec(spec);

  if (!SwaggerValidator.validate(spec)) {
    console.error('Invalid OpenAPI 3.1.1 specification.');
    process.exit(1);
  }

  const dockerGen = new DockerGenerator();
  const config = { Image: 'node:18-alpine' };
  try {
    const container = await dockerGen.generateContainer(config);
    if (container) {
      console.log('Docker container created:', container.id);
    } else {
      console.error('Docker container creation failed.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error creating Docker container:', err);
    process.exit(1);
  }
}

main();
