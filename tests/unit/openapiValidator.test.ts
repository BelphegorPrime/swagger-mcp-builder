import { test } from "node:test";
import { OpenAPIValidator } from "../../src/services/openapiValidator.js";
import { OpenAPIV3_1 } from "openapi-types";
import assert from "assert";

test("OpenAPIValidator: validates a correct OpenAPI v3.1 spec", () => {
  const spec: OpenAPIV3_1.Document = {
    openapi: "3.1.0",
    info: { title: "Test", version: "1.0.0" },
    paths: {},
  } as any;
  assert.strictEqual(OpenAPIValidator.validate(spec), true);
});

test("OpenAPIValidator: rejects missing openapi field", () => {
  const spec: any = { info: { title: "Test", version: "1.0.0" }, paths: {} };
  assert.strictEqual(OpenAPIValidator.validate(spec), false);
});

test("OpenAPIValidator: rejects invalid openapi version", () => {
  const spec: any = { openapi: "2.0.0", info: { title: "Test", version: "1.0.0" }, paths: {} };
  assert.strictEqual(OpenAPIValidator.validate(spec), false);
});

test("OpenAPIValidator: rejects missing info section", () => {
  const spec: any = { openapi: "3.1.0", paths: {} };
  assert.strictEqual(OpenAPIValidator.validate(spec), false);
});

test("OpenAPIValidator: rejects missing paths section", () => {
  const spec: any = { openapi: "3.1.0", info: { title: "Test", version: "1.0.0" } };
  assert.strictEqual(OpenAPIValidator.validate(spec), false);
});
