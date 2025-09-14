// Service to validate OpenAPI files (v3+)
import { OpenAPIV3_1 } from 'openapi-types';

export class OpenAPIValidator {
  static validate(spec: OpenAPIV3_1.Document): boolean {
      // Structured logging helper
      const log = (level: 'info' | 'error', message: string, details?: object) => {
        const event = {
          service: 'OpenAPIValidator',
          level,
          message,
          timestamp: new Date().toISOString(),
          ...details
        };
        if (level === 'error') {
          console.error(JSON.stringify(event));
        } else {
          console.log(JSON.stringify(event));
        }
      };

      // Check OpenAPI version
      if (!spec.openapi || typeof spec.openapi !== 'string') {
        log('error', 'Missing or invalid openapi version field', { spec });
        return false;
      }
      if (!/^([3-9]\d*)\.(\d+)\.(\d+)$/.test(spec.openapi)) {
        log('error', 'OpenAPI version must be 3.0.0 or higher', { openapi: spec.openapi });
        return false;
      }
      if (!spec.info || typeof spec.info.title !== 'string' || typeof spec.info.version !== 'string') {
        log('error', 'Missing or invalid info section', { info: spec.info });
        return false;
      }
      if (!spec.paths || typeof spec.paths !== 'object') {
        log('error', 'Missing or invalid paths section', { paths: spec.paths });
        return false;
      }
      // Optionally check for servers, components, security, etc.
      // Add more checks as needed for stricter validation
      log('info', 'Spec validated successfully', { openapi: spec.openapi });
      return true;
  }
}
