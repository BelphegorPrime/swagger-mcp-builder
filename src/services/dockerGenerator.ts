// Docker container generation logic
import Dockerode from "dockerode";

export class DockerGenerator {
  docker: Dockerode;

  constructor() {
    this.docker = new Dockerode();
  }

  async generateContainer(
    config: Dockerode.ContainerCreateOptions,
  ): Promise<Dockerode.Container | null> {
    try {
      console.log("[DockerGenerator] Creating Docker container with config:", config);
      const container = await this.docker.createContainer(config);
      await container.start();
      console.log("[DockerGenerator] Docker container started:", container.id);
      return container;
    } catch (err) {
      console.error("[DockerGenerator] Docker container creation failed:", err);
      return null;
    }
  }
}
