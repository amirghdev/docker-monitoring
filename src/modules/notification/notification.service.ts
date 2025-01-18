import { Injectable, OnModuleInit } from '@nestjs/common';
import { DockerService } from '../docker/docker.service';
import { DockerContainer } from 'src/common/types/global.type';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    private readonly dockerService: DockerService,
    private readonly httpService: HttpService,
  ) {}

  private readonly TELEGRAM_BASE_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

  private containers: DockerContainer[] = [];

  async onModuleInit(): Promise<void> {
    while (true) {
      const containers = await this.getAllContainers();
      await this.checkForDownContainers(containers);
      await this.sleep(1000);
    }
  }

  private async getAllContainers(): Promise<DockerContainer[]> {
    const containers = await this.dockerService.getAllContainers();

    return containers;
  }

  private async checkForDownContainers(
    containers: DockerContainer[],
  ): Promise<void> {
    //? When App starts, this.containers is empty
    if (!this.containers || this.containers.length === 0) {
      this.containers = containers;
      return;
    }

    console.log('containers', this.containers);

    const downContainers = this.containers.filter((c) =>
      c.status.includes('Exited'),
    );

    const newDownContainers = containers.filter((c) =>
      c.status.includes('Exited'),
    );

    console.log('Down containers:', downContainers.length);
    console.log('New down containers:', newDownContainers.length);

    if (newDownContainers.length > downContainers.length) {
      const newDownContainer = newDownContainers.find(
        (newContainer) =>
          !downContainers.some(
            (downContainer) => downContainer.id === newContainer.id,
          ),
      );

      if (!newDownContainer) {
        return;
      }

      console.log('New down container:', newDownContainer);

      //? Send notification
      await this.sendTelegramMessage(
        'Container down: ' + newDownContainer.name,
      );
    }

    this.containers = containers;
  }

  private async sendTelegramMessage(message: string): Promise<void> {
    try {
      const url = `${this.TELEGRAM_BASE_URL}/sendMessage`;

      await this.httpService.axiosRef.post(url, {
        text: message,
        chat_id: process.env.CHAT_ID,
      });
    } catch (error) {
      console.log(error);
    }
  }

  private sleep(ms: number): Promise<void> {
    console.log('Sleeping for', ms, 'ms');
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
