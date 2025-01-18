import { Injectable } from '@nestjs/common';
import Dockerode from 'dockerode';
import { DockerContainer } from 'src/common/types/global.type';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Docker = require('dockerode');

@Injectable()
export class DockerService {
  public readonly docker: Dockerode;
  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  public async getAllContainers(): Promise<DockerContainer[]> {
    try {
      const lists: DockerContainer[] = [];
      const containers = await this.docker.listContainers({ all: true });

      for (const container of containers) {
        lists.push({
          id: container.Id,
          name: container.Names[0].substring(1),
          image: container.Image,
          state: container.State,
          status: container.Status,
        });
      }
      return lists;
    } catch (err) {
      return err;
    }
  }
}
