# Data Model: OpenAPI Specification Support (v3+)

## Entities

### OpenAPI Specification File
- Attributes:
  - version: string (must be >= 3.0.0)
  - paths: object
  - components: object
  - info: object
  - servers: array
  - security: array
  - tags: array
- Relationships:
  - Used by validation service

### Version Field
- Attributes:
  - value: string
- Validation:
  - Must match /^3\.\d+\.\d+$/ or higher

## Validation Rules
- OpenAPI file MUST have a version field
- Version MUST be >= 3.0.0
- File MUST be rejected if version < 3.0.0
- Malformed or missing version field MUST trigger error
