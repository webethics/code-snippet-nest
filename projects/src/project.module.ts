import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { projectService } from './services/project.services';
import { ConfigService } from './services/config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Project, ProjectSchema } from './schemas/project.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
  ],
  controllers: [ProjectController],
  providers: [projectService, ConfigService],
})
export class ProjectModule {}
