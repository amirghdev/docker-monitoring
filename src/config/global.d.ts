declare global {
  namespace NodeJS {
    export class ProcessEnv {
      PORT: number;
      SWAGGER_URL: string;
      PREFIX: string;
      API_KEY: string;
    }
  }
}

export {};
