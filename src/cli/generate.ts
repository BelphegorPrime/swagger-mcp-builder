// CLI command to trigger MCP server Docker generation
import { SwaggerValidator } from '../services/swaggerValidator.js';
import { DockerGenerator } from '../services/dockerGenerator.js';
import { SwaggerSpec } from '../models/swaggerSpec.js';
import fs from 'fs';

async function main() {
  let swaggerPath = process.argv[2];
  if (!swaggerPath) {
    // Use openapi.yaml by default if no argument is provided
    swaggerPath = 'openapi.yaml';
    console.log('No input file provided. Using default: openapi.yaml');
  }

  let spec;
  try {
    if (!fs.existsSync(swaggerPath)) {
      console.error(`Error: File not found: ${swaggerPath}`);
      process.exit(1);
    }
    const fileContent = fs.readFileSync(swaggerPath, 'utf-8');
    // Try YAML first, fallback to JSON
    try {
      // Use yaml library if available, fallback to JSON
      // For now, check if file looks like YAML
      if (swaggerPath.endsWith('.yaml') || swaggerPath.endsWith('.yml')) {
        // Dynamically import yaml if available
        let yaml;
        try {
          yaml = (await import('yaml')).default;
        } catch (e) {
          console.error('YAML parser not installed. Run `npm install yaml` to support YAML files.');
          process.exit(1);
        }
        spec = yaml.parse(fileContent);
      } else {
        spec = JSON.parse(fileContent);
      }
    } catch (parseErr) {
      console.error(`Error: Invalid YAML/JSON in file: ${swaggerPath}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Failed to read or parse swagger file:', err);
    process.exit(1);
  }

  // Validate OpenAPI spec
  if (!SwaggerValidator.validate(spec)) {
    console.error('Error: Invalid OpenAPI 3.1.1 specification.');
    process.exit(1);
  }

  // Generate Docker container
  const dockerGen = new DockerGenerator();
  const config = { Image: 'node:18-alpine' };
  try {
    const container = await dockerGen.generateContainer(config);
    if (container) {
      console.log('Docker container created:', container.id);
    } else {
      console.error('Error: Docker container creation failed.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error: Exception during Docker container creation:', err);
    process.exit(1);
  }
}

main();
