import { DockerGenerator } from "../../src/services/dockerGenerator.js";
import assert from "assert";
import { describe, it } from "node:test";

describe("Performance: API call throughput", () => {
  it("should measure container creation time", async () => {
    const dockerGen = new DockerGenerator();
    const config = { Image: "node:18-alpine" };
    const start = Date.now();
    const container = await dockerGen.generateContainer(config);
    const end = Date.now();
    assert.ok(container);
    const duration = end - start;
    console.log("Container creation duration (ms):", duration);
    // Example threshold: 5000ms
    assert.ok(duration < 5000, "Container creation took too long");
  });
});
