// Docker container generation logic
import Dockerode from "dockerode";

export class DockerGenerator {
  docker: Dockerode;

  constructor() {
    this.docker = new Dockerode();
  }

  async generateContainer(
    config: Dockerode.ContainerCreateOptions,
    tag?: string,
  ): Promise<Dockerode.Container | null> {
    try {
      console.log("[DockerGenerator] Creating Docker container with config:", config);
      const container = await this.docker.createContainer(config);
      await container.start();
      console.log("[DockerGenerator] Docker container started:", container.id);
      if (tag) {
        await this.tagContainer(container.id, tag);
      }
      return container;
    } catch (err) {
      console.error("[DockerGenerator] Docker container creation failed:", err);
      return null;
    }
  }

  async tagContainer(containerId: string, tag: string): Promise<void> {
    try {
      const container = this.docker.getContainer(containerId);
      const inspect = await container.inspect();
      const imageId = inspect.Image;
      const image = this.docker.getImage(imageId);
      await image.tag({ repo: tag });
      console.log(`[DockerGenerator] Tagged container ${containerId} with tag: ${tag}`);
    } catch (err) {
      console.error(`[DockerGenerator] Failed to tag container ${containerId}:`, err);
    }
  }
}
