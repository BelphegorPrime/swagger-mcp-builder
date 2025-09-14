import { SwaggerSpec } from "../../src/models/swaggerSpec.js";
import { OpenAPIV3_1 } from "openapi-types";
import assert from "assert";
import { describe, it } from "node:test";

describe("SwaggerSpec", () => {
  it("should validate a correct OpenAPI 3.1.1 spec", () => {
    const spec: OpenAPIV3_1.Document = {
      openapi: "3.1.1",
      info: { title: "Test", version: "1.0.0" },
      paths: {},
    };
    const swagger = new SwaggerSpec(spec);
    assert.strictEqual(swagger.validate(), true);
  });

  it("should fail validation for incorrect spec version", () => {
    const spec: OpenAPIV3_1.Document = {
      openapi: "3.0.0",
      info: { title: "Test", version: "1.0.0" },
      paths: {},
    };
    const swagger = new SwaggerSpec(spec);
    assert.strictEqual(swagger.validate(), false);
  });
});
