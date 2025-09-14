import { execSync } from "child_process";
import fs from "fs";
import assert from "assert";
import path from "path";
import { describe, it, before, after } from "node:test";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("End-to-End: Valid swagger.json → running container", () => {
  const swaggerPath = path.join(__dirname, "test-swagger.json");
  const swaggerSpec = {
    openapi: "3.1.1",
    info: { title: "Test API", version: "1.0.0" },
    paths: {},
  };

  before(() => {
    fs.writeFileSync(swaggerPath, JSON.stringify(swaggerSpec));
  });

  after(() => {
    fs.unlinkSync(swaggerPath);
  });

  it("should create and start a Docker container", () => {
    // Run CLI command
    const output = execSync(`node dist/cli/generate.js ${swaggerPath}`, { encoding: "utf-8" });
    assert.match(output, /Docker container created:/);
  });
});
