import assert from "assert";
import { describe, it } from "node:test";
import { spawnSync } from "child_process";
import fs from "fs";
import { isValidOpenAPIVersion } from "../../src/models/versionField.js";

describe("OpenAPI Quickstart Scenario", () => {
  it("validates a quickstart OpenAPI file version", () => {
    // ...existing code...
    assert.strictEqual(isValidOpenAPIVersion("3.1.0"), true);
  });

  it("runs 'npm run dev' and expects successful execution with default openapi.yaml", () => {
    // Ensure openapi.yaml exists
    assert.ok(fs.existsSync("openapi.yaml"), "openapi.yaml must exist in project root");
    // Run npm script
    const result = spawnSync("npm", ["run", "dev"], { encoding: "utf-8" });
    assert.strictEqual(
      result.status,
      0,
      `npm run dev should exit with code 0, got ${result.status}`,
    );
    assert.match(result.stdout, /openapi.yaml/i, "Output should mention openapi.yaml");
  });

  it("runs 'npm run dev' with a custom file argument and expects successful execution", () => {
    // Create a temporary custom OpenAPI file
    const customFile = "custom-openapi.yaml";
    fs.writeFileSync(
      customFile,
      "openapi: 3.1.0\ninfo:\n  title: Custom API\n  version: 1.0.0\npaths: {}\n",
    );
    // Run npm script with custom file
    const result = spawnSync("npm", ["run", "dev", "--", customFile], { encoding: "utf-8" });
    assert.strictEqual(
      result.status,
      0,
      `npm run dev -- ${customFile} should exit with code 0, got ${result.status}`,
    );
    assert.match(
      result.stdout,
      /custom-openapi.yaml/i,
      "Output should mention custom-openapi.yaml",
    );
    // Clean up
    fs.unlinkSync(customFile);
  });
});
