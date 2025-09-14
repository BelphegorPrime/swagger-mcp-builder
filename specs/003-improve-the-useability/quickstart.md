# Quickstart: Using the 'dev' Script

## Prerequisites
- Node.js and npm installed
- Project dependencies installed (`npm install`)
- `openapi.yaml` present in the root directory

## Steps
1. Run `npm run dev` to start the tool with the default `openapi.yaml` in the project root.
2. To use a different OpenAPI file, run `npm run dev -- <path-to-file>`.
3. If `openapi.yaml` is missing, the tool will show an error and exit.
4. If the OpenAPI file is invalid (malformed YAML/JSON), the tool will show a parsing error and exit.

## Expected Outcome
- Tool runs using the OpenAPI spec and provides output or validation results
