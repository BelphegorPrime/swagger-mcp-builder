// CLI command to trigger MCP server Docker generation
import { SwaggerValidator } from "../services/swaggerValidator.js";
import { DockerGenerator } from "../services/dockerGenerator.js";
import fs from "fs";
import yaml from "yaml";

async function main() {
  let swaggerPath = process.argv[2];
  if (!swaggerPath) {
    // Use openapi.yaml by default if no argument is provided
    swaggerPath = "openapi.yaml";
    console.log("No input file provided. Using default: openapi.yaml");
  }

  let spec;
  try {
    if (!fs.existsSync(swaggerPath)) {
      console.error(`Error: File not found: ${swaggerPath}`);
      process.exit(1);
    }
    const fileContent = fs.readFileSync(swaggerPath, "utf-8");
    // Try YAML first, fallback to JSON
    try {
      // Use yaml library for .yaml/.yml files, fallback to JSON
      if (swaggerPath.endsWith(".yaml") || swaggerPath.endsWith(".yml")) {
        console.log("Parsing as YAML:", swaggerPath);
        let yamlParser;
        try {
          yamlParser = typeof require !== "undefined" ? require("yaml") : yaml;
        } catch (e) {
          yamlParser = yaml;
        }
        spec = yamlParser.parse(fileContent);
      } else {
        console.log("Parsing as JSON:", swaggerPath);
        spec = JSON.parse(fileContent);
      }
    } catch (parseErr) {
      console.error(`Error: Invalid YAML/JSON in file: ${swaggerPath}`);
      process.exit(1);
    }
  } catch (err) {
    console.error("Failed to read or parse swagger file:", err);
    process.exit(1);
  }

  // Validate OpenAPI spec
  if (!SwaggerValidator.validate(spec)) {
    console.error("Error: Invalid OpenAPI 3.1.1 specification.");
    process.exit(1);
  }

  // Generate Docker container with default tag
  const dockerGen = new DockerGenerator();
  const config = { Image: "node:lts-alpine" };
  // Get project name from package.json
  let projectName = "project";
  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    if (pkg.name) projectName = pkg.name;
  } catch {}
  // Get API name from OpenAPI spec
  let apiName = "api";
  if (spec && spec.info && spec.info.title) {
    apiName = spec.info.title.replace(/\s+/g, "-").toLowerCase();
  }
  const defaultTag = `${projectName}:${apiName}`;
  try {
    const containerConfig = await dockerGen.generateContainer(config, defaultTag);
    if (containerConfig) {
      console.log("Docker image built and tagged as:", defaultTag);
      console.log("To start the container, run:");
      console.log(`  docker run -it --rm ${defaultTag}`);
    } else {
      console.error("Error: Docker image build failed.");
      process.exit(1);
    }
  } catch (err) {
    console.error("Error: Exception during Docker image build:", err);
    process.exit(1);
  }
}

main();
