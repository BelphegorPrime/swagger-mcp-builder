# Tasks: MCP Server Docker Generator from Swagger (OpenAPI 3.1.1)

## Parallel Execution Guidance
- Tasks marked [P] can be executed in parallel (different files, no dependencies)
- Sequential tasks must be completed in order (shared files or dependencies)

---

## Numbered, Ordered Tasks

### Setup Tasks
T001. Initialize Node.js project in `src/` and `tests/` directories
T002. Add minimal dependencies for OpenAPI 3.1.1 parsing and Docker SDK
T003. Set up Node.js built-in testrunner and linting

### Model & Entity Tasks [P]
T004. Create Swagger Specification model in `src/models/swaggerSpec.js` [P]
T005. Create MCP Server Docker Container model in `src/models/dockerContainer.js` [P]

### Contract & Test Tasks [P]
T006. Write contract test for Swagger Specification validation in `tests/contract/swaggerSpec.test.js` [P]
T007. Write contract test for Docker Container generation in `tests/contract/dockerContainer.test.js` [P]

### Core Implementation Tasks
T008. Implement Swagger file validation logic in `src/services/swaggerValidator.js`
T009. Implement Docker container generation logic in `src/services/dockerGenerator.js`
T010. Implement CLI command to trigger generation in `src/cli/generate.js`

### Integration & Scenario Tasks [P]
T011. Write integration test for end-to-end workflow (valid swagger.yml → running container) in `tests/integration/e2e.test.js` [P]
T012. Write integration test for error handling (invalid swagger.yml) in `tests/integration/error.test.js` [P]
T013. Write integration test for authentication flows in `tests/integration/auth.test.js` [P]

### Polish & Documentation Tasks [P]
T014. Write quickstart documentation in `specs/001-write-a-tool/quickstart.md` [P]
T015. Add structured logging to all services in `src/services/` [P]
T016. Add performance test for API call throughput in `tests/unit/performance.test.js` [P]
T017. Finalize README and usage docs in `src/README.md` [P]

---

## Dependency Notes
- Setup tasks (T001-T003) must be completed before any other tasks
- Model and contract test tasks (T004-T007) can be done in parallel after setup
- Core implementation (T008-T010) depends on models and contract tests
- Integration tests (T011-T013) depend on core implementation
- Polish/documentation tasks (T014-T017) can be done in parallel after integration

---

## Task Agent Commands (Examples)
- To run all parallel tasks: `copilot run-tasks --parallel T004,T005,T006,T007`
- To run sequentially: `copilot run-tasks T001 T002 T003 T008 T009 T010 T011 T012 T013 T014 T015 T016 T017`

---

## File Paths
- All source code: `/home/marcel/projects/private/swagger-mcp-builder/src/`
- All tests: `/home/marcel/projects/private/swagger-mcp-builder/tests/`
- All specs/docs: `/home/marcel/projects/private/swagger-mcp-builder/specs/001-write-a-tool/`

---

## Feature Name
MCP Server Docker Generator from Swagger (OpenAPI 3.1.1)
