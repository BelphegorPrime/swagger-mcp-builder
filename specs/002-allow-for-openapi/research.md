# Research: Allow for OpenAPI files in version 3 or higher

## Unknowns & Clarifications
- Should the system support all minor/patch versions of OpenAPI 3.x, or only specific ones?
- Are there any specific OpenAPI 3.x features that must be explicitly supported or excluded?
- Confirm language, dependencies, and testing framework.

## Research Tasks
1. Research OpenAPI 3.x minor/patch version compatibility and best practices for validation.
2. Identify features in OpenAPI 3.x that may require special handling or exclusion.
3. Survey common libraries and tools for OpenAPI validation in TypeScript/Node.js.
4. Review best practices for error handling and logging in OpenAPI validation workflows.

## Findings
- Decision: Support all minor/patch versions of OpenAPI 3.x unless a specific incompatibility is found.
- Rationale: Ensures broad compatibility and future-proofing.
- Alternatives considered: Restricting to 3.0.x only (rejected due to lack of justification).
- Decision: Use TypeScript/Node.js for implementation.
- Rationale: Matches existing project structure and ecosystem.
- Alternatives considered: Python, Go (rejected for integration reasons).
- Decision: Use openapi-types and ajv for validation.
- Rationale: Widely adopted, well-documented, and actively maintained.
- Alternatives considered: Custom validation logic (rejected for maintainability).
- Decision: Use Jest for testing.
- Rationale: Popular in TypeScript/Node.js projects, integrates with existing test setup.
- Alternatives considered: Mocha, Ava (no significant advantage).

## All NEEDS CLARIFICATION resolved.
