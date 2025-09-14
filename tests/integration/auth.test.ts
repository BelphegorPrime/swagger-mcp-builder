import { execSync } from "child_process";
import fs from "fs";
import assert from "assert";
import path from "path";
import { describe, it, before, after } from "node:test";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("Integration: Authentication flows", () => {
  const swaggerPath = path.join(__dirname, "auth-swagger.json");
  const authSpec = {
    openapi: "3.1.1",
    info: { title: "Auth API", version: "1.0.0" },
    paths: {
      "/secure": {
        get: {
          security: [{ BearerAuth: [] }],
          responses: { "200": { description: "OK" } },
        },
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  };

  before(() => {
    fs.writeFileSync(swaggerPath, JSON.stringify(authSpec));
  });

  after(() => {
    fs.unlinkSync(swaggerPath);
  });

  it("should recognize authentication requirements in the spec", () => {
    const output = execSync(`node dist/cli/generate.js ${swaggerPath}`, { encoding: "utf-8" });
    // For now, just check that the container is created; future: check auth handling
    assert.match(output, /Docker container created:/);
  });
});
