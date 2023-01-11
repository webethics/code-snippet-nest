import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);
  await app.listenAsync();
}
bootstrap();
