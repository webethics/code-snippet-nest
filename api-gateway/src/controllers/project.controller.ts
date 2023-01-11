import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Inject,
  Param,
  UseGuards,
  Request,
  HttpStatus,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProjectDto } from '../interfaces/project/dto/create-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from '../interfaces/project/dto/update-project.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProjectIdDto } from 'src/interfaces/project/dto/get-project-id.dto';

// project routes //
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(
    @Inject('PROJECT_SERVICE')
    private readonly projectServiceClient: ClientProxy,
  ) {}

  // to create the new project //
  @Post('/new')
  public async createProject(
    @Request() req,
    @Body() Request: CreateProjectDto,
  ): Promise<any> {
    var obj1 = { user_id: req.user.sub };
    var obj2 = Request;
    const data = { ...obj1, ...obj2 };
    try {
      let project = await this.projectServiceClient
        .send<any>({ cmd: 'project_create' }, data)
        .toPromise();
      return project;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // to update the project //

  @Put('/update/:project_id')
  public async updateProject(
    @Request() req,
    @Param() params: ProjectIdDto,
    @Body() Request: UpdateProjectDto,
  ): Promise<any> {
    const data = {
      project_id: params.project_id,
      project: Request,
      user_id: req.user.sub,
    };
    let project = await this.projectServiceClient
      .send<any>({ cmd: 'project_update' }, data)
      .toPromise();
    if (project && project != 'invalid_id' && project != 'bad_request') {
      return {
        status: true,
        code: HttpStatus.OK,
        message: 'Project updated successfully',
        project: project,
      };
    } else if (project === 'invalid_id' && project != 'bad_request') {
      throw new HttpException('Please Enter Valid Project_id', HttpStatus.OK);
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // to get the all projects /
  @Get('/all')
  public async getProjects(): Promise<any> {
    return await this.projectServiceClient
      .send<any>({ cmd: 'get_projects' }, {})
      .toPromise();
  }

  // to get the single project //

  @Get('/:project_id')
  public async getProject(
    @Request() req,
    @Param() Param: ProjectIdDto,
  ): Promise<any> {
    let project = await this.projectServiceClient
      .send<any>({ cmd: 'get_single_project' }, Param)
      .toPromise();
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.OK);
    } else if (project) {
      throw new HttpException(project, HttpStatus.OK);
    } else {
      throw new HttpException('Bad request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
  // to delete the single project //

  @Delete('/:project_id')
  public async deleteProject(
    @Request() req,
    @Param() param: ProjectIdDto,
  ): Promise<any> {
    var obj1 = { user_id: req.user.sub };
    var data = { obj1, param };
    let info = await this.projectServiceClient
      .send<any>({ cmd: 'delete_project' }, data)
      .toPromise();
    if (info && info != 'invalid_id') {
      throw new HttpException(info, HttpStatus.OK);
    } else if (info && info === 'invalid_id') {
      throw new HttpException('Please Enter Valid Project_id', HttpStatus.OK);
    }
  }
}
