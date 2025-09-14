## OpenAPI Validation Usage

### CLI

To validate an OpenAPI file (v3+):

```bash
npm run build
node dist/cli/validateOpenapi.js path/to/openapi.yaml
```

### Service

You can use the `OpenAPIValidator` service directly:

```typescript
import { OpenAPIValidator } from '../src/services/openapiValidator';
import { OpenAPIV3_1 } from 'openapi-types';

const spec: OpenAPIV3_1.Document = /* load or parse your OpenAPI spec */;
const isValid = OpenAPIValidator.validate(spec);
console.log('Valid?', isValid);
```
# MCP Server Docker Generator from Swagger (OpenAPI 3.1.1)

## Overview
This tool generates an MCP server Docker container from a given OpenAPI 3.1.1 swagger.json file. It validates the specification, creates a Docker container, and supports basic API operations and authentication flows.

## Usage
1. Prepare your `swagger.json` file (OpenAPI 3.1.1).
2. Build the project: `npm run build`
3. Run the generator: `node dist/cli/generate.js <swagger.json>`

## Features
- OpenAPI 3.1.1 validation
- Docker container generation
- Authentication flow support
- Structured logging
- Integration and performance tests

## Project Structure
- `src/` - Source code
- `tests/` - Tests (contract, integration, unit)
- `specs/001-write-a-tool/` - Documentation and quickstart

## License
MIT
