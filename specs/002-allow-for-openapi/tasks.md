# Tasks: Allow for OpenAPI files in version 3 or higher

**Input**: Design documents from `/specs/002-allow-for-openapi/`
**Prerequisites**: plan.md (required), research.md, data-model.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: integration tests, validation tests
   → Core: models, services, CLI commands
   → Integration: logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All entities have models?
   → All user stories have integration tests?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

---

### Setup Tasks
T001 [P] Initialize project environment and dependencies (TypeScript, Node.js, openapi-types, ajv, node test runner)
T002 [P] Set up linting and formatting (ESLint, Prettier)

### Model Tasks
T003 [P] Implement OpenAPI Specification File model in `src/models/openapiSpec.ts` (attributes: version, paths, components, info, servers, security, tags)
T004 [P] Implement Version Field validation logic in `src/models/versionField.ts`

### Test Tasks
T005 [P] Write integration test for OpenAPI file validation in `tests/integration/openapiValidation.test.ts` (valid v3+ file)
T006 [P] Write integration test for rejection of OpenAPI v2 files in `tests/integration/openapiValidation.test.ts`
T007 [P] Write integration test for malformed/missing version field in `tests/integration/openapiValidation.test.ts`
T008 [P] Write quickstart scenario test in `tests/integration/openapiQuickstart.test.ts`

### Core Implementation Tasks
T009 Implement CLI command `validate-openapi` in `src/cli/validateOpenapi.ts` to process and validate OpenAPI files
T010 Implement validation service in `src/services/openapiValidator.ts` to check version and structure
T011 Integrate structured logging in validation service (`src/services/openapiValidator.ts`)

### Polish Tasks
T012 [P] Write unit tests for model and service logic in `tests/unit/`
T013 [P] Document usage and examples in `README.md` and `specs/002-allow-for-openapi/quickstart.md`
T014 [P] Performance test: Validate 1000 OpenAPI files in `tests/performance/openapiPerf.test.ts`

---

## Parallel Execution Guidance
Tasks marked [P] can be executed in parallel:
- T001, T002, T003, T004, T005, T006, T007, T008, T012, T013, T014
Sequential tasks (core implementation) should follow after models and tests are in place.

## Dependency Notes
- Setup tasks (T001, T002) must be completed before any implementation or tests.
- Model tasks (T003, T004) should precede service and CLI implementation (T009, T010).
- Test tasks (T005-T008) should be written before implementation (TDD).
- Logging (T011) is integrated with validation service.
- Polish tasks (T012-T014) can be run after core implementation.

---

## Task Agent Example Commands
```bash
# Example: Run all parallel tasks
copilot run-tasks T001 T002 T003 T004 T005 T006 T007 T008 T012 T013 T014
# Example: Run sequential core tasks
copilot run-tasks T009 T010 T011
```