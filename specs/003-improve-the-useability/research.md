# Research: Improve Usability with 'dev' Script

## Unknowns from Technical Context
- Language/Version: TypeScript (from repo context)
- Primary Dependencies: Node.js, npm, openapi tool (NEEDS CLARIFICATION: which tool is run by dev script?)
- Storage: N/A (no persistent storage required)
- Testing: node test runner (from repo context)
- Target Platform: Linux, cross-platform
- Project Type: Single project (CLI tool)
- Performance Goals: Not specified
- Constraints: Not specified
- Scale/Scope: Not specified

## Research Tasks
- Research best practices for npm scripts in CLI tools
- Research error handling for missing/invalid YAML files in Node.js
- Research documentation standards for npm scripts in README

## Findings
### Decision: Use npm script 'dev' to run CLI tool with openapi.yaml as default
- Rationale: Simplifies developer workflow, reduces friction
- Alternatives considered: Manual CLI invocation, environment variables

### Decision: Error handling for missing/invalid YAML
- Rationale: Improves usability, prevents silent failures
- Alternatives considered: Silent fail, fallback to example file

### Decision: Document 'dev' script in README
- Rationale: Ensures discoverability and correct usage
- Alternatives considered: Inline comments, external docs

## All NEEDS CLARIFICATION resolved
- The tool to run is assumed to be the main CLI entry point in src/cli/
- No additional performance or scale constraints identified
- No additional dependencies required
