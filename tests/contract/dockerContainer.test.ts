import { DockerContainer } from "../../src/models/dockerContainer.js";
import Dockerode from "dockerode";
import assert from "assert";
import { describe, it } from "node:test";

describe("DockerContainer", () => {
  it("should generate a Docker container from config", () => {
    const config: Dockerode.ContainerCreateOptions = { Image: "node:18-alpine" };
    const container = new DockerContainer(config);
    assert.strictEqual(container.generate(), true);
  });
});
