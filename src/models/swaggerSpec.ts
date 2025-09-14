// Swagger Specification model for OpenAPI 3.1.1
import { OpenAPIV3_1 } from "openapi-types";

export class SwaggerSpec {
  spec: OpenAPIV3_1.Document;

  constructor(spec: OpenAPIV3_1.Document) {
    this.spec = spec;
  }

  // Validate OpenAPI 3.1.1 compliance
  validate(): boolean {
    // Basic check for OpenAPI version
    return this.spec.openapi === "3.1.1";
  }
}
