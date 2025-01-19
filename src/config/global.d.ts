declare global {
  namespace NodeJS {
    export class ProcessEnv {
      PORT: number;
      SWAGGER_URL: string;
      PREFIX: string;
      API_KEY: string;
      BOT_TOKEN: string;
      CHAT_ID: string;
      DOCKER_SOCKET_PATH: string;
    }
  }
}

export {};
