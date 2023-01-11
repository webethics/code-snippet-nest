import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT || 5000;
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT || 5001,
        host: process.env.USER_SERVICE_HOST || '127.0.0.1',
      },
      transport: Transport.TCP,
    };
    this.envConfig.authService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT || 5002,
        host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
      },
      transport: Transport.TCP,
    };
    this.envConfig.projectService = {
      options: {
        port: process.env.PROJECT_SERVICE_PORT || 5003,
        host: process.env.PROJECT_SERVICE_HOST || '127.0.0.1',
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
