# Data Model: Improve Usability with 'dev' Script

## Entity: OpenAPI Spec File
- Attributes:
  - filePath: string (absolute path to YAML file)
  - format: string (YAML)
  - validity: boolean (is file valid OpenAPI)
- Relationships:
  - Used by CLI tool for validation/generation

## Validation Rules
- filePath must exist and be readable
- format must be YAML
- validity must be true for successful execution
