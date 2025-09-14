# Data Model: MCP Server Docker Generator

## Entities

### Swagger Specification (swagger.yml)
- Represents the API definition
- Key attributes: endpoints, methods, parameters, authentication requirements

### MCP Server Docker Container
- Encapsulates the generated server
- Key attributes: API call capability, Docker configuration, runtime environment

## Relationships
- The MCP Server Docker Container is generated based on the Swagger Specification

## Validation Rules
- Swagger specification must comply with OpenAPI 3.1.1
- All required fields must be present
- Authentication requirements must be clearly defined
