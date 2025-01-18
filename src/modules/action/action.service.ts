import { Injectable } from '@nestjs/common';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class ActionService {
  constructor(private readonly dockerService: DockerService) {}
  public startContainer(id: string): { message: string } {
    const container = this.dockerService.docker.getContainer(id);

    if (!container) {
      return {
        message: 'container not found',
      };
    }

    container.start((err) => {
      if (err) {
        return {
          message: `error in starting container : ${id}}`,
        };
      }
    });

    return {
      message: `container: ${id} has been started`,
    };
  }

  public stopContainer(id: string): { message: string } {
    const container = this.dockerService.docker.getContainer(id);

    if (!container) {
      return {
        message: 'container not found',
      };
    }

    container.stop((err) => {
      if (err) {
        return {
          message: `error in starting container : ${id}}`,
        };
      }
    });

    return {
      message: `container: ${id} has been stopped`,
    };
  }

  public restartContainer(id: string): { message: string } {
    const container = this.dockerService.docker.getContainer(id);

    if (!container) {
      return {
        message: 'container not found',
      };
    }

    container.restart((err) => {
      if (err) {
        return {
          message: `error in starting container : ${id}}`,
        };
      }
    });

    return {
      message: `container: ${id} hash been restarted`,
    };
  }
}
