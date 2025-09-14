// Swagger file validation logic
import { OpenAPIV3_1 } from 'openapi-types';

export class SwaggerValidator {
  static validate(spec: OpenAPIV3_1.Document): boolean {
    // Check OpenAPI version
    if (spec.openapi !== '3.1.1') {
      console.error('[SwaggerValidator] Invalid OpenAPI version:', spec.openapi);
      return false;
    }
    if (!spec.info || typeof spec.info.title !== 'string' || typeof spec.info.version !== 'string') {
      console.error('[SwaggerValidator] Missing or invalid info section');
      return false;
    }
    if (!spec.paths || typeof spec.paths !== 'object') {
      console.error('[SwaggerValidator] Missing or invalid paths section');
      return false;
    }
    // Optionally check for servers, components, security, etc.
    // Add more checks as needed for stricter validation
    console.log('[SwaggerValidator] Spec validated successfully');
    return true;
  }
}
