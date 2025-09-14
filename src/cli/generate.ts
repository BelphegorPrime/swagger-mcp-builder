// CLI command to trigger MCP server Docker generation
import { SwaggerValidator } from '../services/swaggerValidator.js';
import { DockerGenerator } from '../services/dockerGenerator.js';
import { SwaggerSpec } from '../models/swaggerSpec.js';
import fs from 'fs';
import yaml from 'yaml';

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
      // Use yaml library for .yaml/.yml files, fallback to JSON
      if (swaggerPath.endsWith('.yaml') || swaggerPath.endsWith('.yml')) {
        console.log('Parsing as YAML:', swaggerPath);
        let yamlParser;
        try {
          yamlParser = typeof require !== 'undefined' ? require('yaml') : yaml;
        } catch (e) {
          yamlParser = yaml;
        }
        spec = yamlParser.parse(fileContent);
      } else {
        console.log('Parsing as JSON:', swaggerPath);
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
