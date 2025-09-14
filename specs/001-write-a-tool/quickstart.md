# Quickstart: MCP Server Docker Generator

## Prerequisites
- Valid `swagger.json` file (OpenAPI 3.1.1)
- Docker installed on target system

## Steps
1. Place your `swagger.json` file in the working directory.
2. Build the project: `npm run build`
3. Run the generator: `node dist/cli/generate.js <swagger.json>`
4. On success, a Docker container is created that can make calls against the API described in `swagger.json`.
5. If errors occur, review error messages and ensure the specification is valid and complete.

## Validation
- Confirm the container can start and make API calls as described in the Swagger specification.
- Test basic operations (GET, POST, PUT, DELETE) for endpoints defined in the spec.
- Verify authentication flows if required by the API.
