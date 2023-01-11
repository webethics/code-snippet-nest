import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.AUTH_SERVICE_PORT || 5002,
    };
    this.envConfig.baseUri = process.env.BASE_URI || 'http://localhost';
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT || 5000;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
