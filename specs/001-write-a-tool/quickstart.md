# Quickstart: MCP Server Docker Generator

## Prerequisites
- Valid `swagger.yml` file (OpenAPI 3.1.1)
- Docker installed on target system

## Steps
1. Place your `swagger.yml` file in the working directory.
2. Run the MCP server Docker generator tool.
3. On success, a Docker container is created that can make calls against the API described in `swagger.yml`.
4. If errors occur, review error messages and ensure the specification is valid and complete.

## Validation
- Confirm the container can start and make API calls as described in the Swagger specification.
- Test basic operations (GET, POST, PUT, DELETE) for endpoints defined in the spec.
- Verify authentication flows if required by the API.
