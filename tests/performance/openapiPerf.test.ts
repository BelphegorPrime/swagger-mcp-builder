import { test } from "node:test";
import { OpenAPIValidator } from "../../src/services/openapiValidator.js";
import { OpenAPIV3_1 } from "openapi-types";
import assert from "assert";

test("Performance: validates 1000 OpenAPI specs quickly", () => {
  const validSpec: OpenAPIV3_1.Document = {
    openapi: "3.1.0",
    info: { title: "PerfTest", version: "1.0.0" },
    paths: {},
  } as any;
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    assert.strictEqual(OpenAPIValidator.validate(validSpec), true);
  }
  const duration = Date.now() - start;
  console.log(`Validated 1000 specs in ${duration}ms`);
  // Arbitrary threshold: should finish in < 2 seconds
  assert.ok(duration < 2000);
});
