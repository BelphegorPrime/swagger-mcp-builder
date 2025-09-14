## Quickstart: OpenAPI Validation

1. Build the project:
	```bash
	npm run build
	```
2. Validate an OpenAPI file:
	```bash
	node dist/cli/validateOpenapi.js path/to/openapi.yaml
	```
3. Programmatic usage:
	```typescript
	import { OpenAPIValidator } from '../../src/services/openapiValidator';
	import { OpenAPIV3_1 } from 'openapi-types';
	const spec: OpenAPIV3_1.Document = /* load spec */;
	OpenAPIValidator.validate(spec);
	```
# Quickstart: OpenAPI v3+ Support

## Steps
1. Prepare an OpenAPI file with version 3.0.0 or higher.
2. Run the CLI tool: `validate-openapi <file>`
3. If the file is valid and version >= 3.0.0, you will see a success message.
4. If the file is invalid or version < 3.0.0, you will see an error message.

## Example
```bash
validate-openapi openapi.yaml
```

## Expected Output
- Success: "OpenAPI file validated. Version: 3.1.0."
- Error: "OpenAPI version must be 3.0.0 or higher."
- Error: "Missing or malformed version field."
