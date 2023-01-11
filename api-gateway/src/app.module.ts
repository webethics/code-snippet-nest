import { Module, } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { ProjectController } from './controllers/project.controller';


import { ConfigService } from './services/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtModule } from '@nestjs/jwt';
// import { FirstController } from './controllers/first.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: process.env.JWT_EXPIREIN || '24h'},
    }),
  ],
  controllers: [AuthController, UsersController, ProjectController],
  providers: [
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PROJECT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const projectServiceOptions = configService.get('projectService');
        return ClientProxyFactory.create(projectServiceOptions);
      },
      inject: [ConfigService],
    },
    JwtStrategy,
  ],
})
export class AppModule {}

