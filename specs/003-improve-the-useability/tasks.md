# Tasks: Improve Usability with 'dev' Script

**Input**: Design documents from `/specs/003-improve-the-useability/`
**Prerequisites**: plan.md (required), research.md, data-model.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
2. Load optional design documents: data-model.md, research.md, quickstart.md
3. Generate tasks by category: setup, tests, core, polish
4. Apply task rules: TDD, parallelization
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness
9. Return: SUCCESS (tasks ready for execution)
```

## Tasks

### Setup
T001 Install project dependencies if not already installed (`npm install`) [P]
T002 Add `dev` npm script to `package.json` to run CLI tool with `openapi.yaml` as default [src/package.json]
T003 Ensure `openapi.yaml` exists in project root [P]

### Tests
T004 Create integration test for running `npm run dev` with default `openapi.yaml` [tests/integration/openapiQuickstart.test.ts]
T005 Create integration test for running `npm run dev` with custom file argument [tests/integration/openapiQuickstart.test.ts]
T006 Create test for error handling when `openapi.yaml` is missing or invalid [tests/integration/openapiValidation.test.ts]

### Core
T007 Implement CLI logic to use `openapi.yaml` by default if no argument is provided [src/cli/generate.ts]
T008 Implement CLI logic to accept custom file path argument [src/cli/generate.ts]
T009 Implement error handling for missing/invalid YAML [src/cli/generate.ts]

### Polish
T010 Document usage of `dev` script in project README [src/README.md] [P]
T011 Review and update quickstart instructions [specs/003-improve-the-useability/quickstart.md] [P]
T012 Refactor code for clarity and maintainability [src/cli/generate.ts]

## Parallel Execution Examples
- T001, T003, T010, T011 can run in parallel ([P])
- T004, T005, T006 can run in parallel ([P])
- T007, T008, T009 must be sequential (same file)

## Dependency Notes
- Setup tasks (T001-T003) must be completed before tests and core implementation
- Tests (T004-T006) should be written before core implementation (TDD)
- Core tasks (T007-T009) depend on setup and test tasks
- Polish tasks (T010-T012) can run after core implementation

---
Tasks are ready for execution. Each task is specific and includes file paths for clarity.
