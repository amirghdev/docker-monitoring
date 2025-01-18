import { Injectable } from '@nestjs/common';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class LogService {
  constructor(private readonly dockerService: DockerService) {}

  public async getContainerLogs(id: string, tail: number): Promise<string> {
    try {
      const container = this.dockerService.docker.getContainer(id);
      const logStream = await container.logs({
        follow: false,
        stdout: true,
        stderr: true,
        tail: tail,
      });

      const logData = logStream.toString() as string;
      return logData
        .split('\n')
        .map((item) => item.slice(8))
        .join('\n');
    } catch (error) {
      return error;
    }
  }
}
