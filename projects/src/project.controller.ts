import { Controller } from '@nestjs/common';
import { projectService } from './services/project.services';
import { MessagePattern } from '@nestjs/microservices';
import { IProject } from './interfaces/project.interface';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: projectService,
  ) {}

  @MessagePattern({ cmd: 'get_projects' })
  public async getProjects(): Promise<IProject> {
     return await this.projectService.getProjects();
  }

  @MessagePattern({ cmd: 'project_create' })
  public async createProject(params: { Request: any }): Promise<any> {
    return await this.projectService.createProject(params);
  }

  @MessagePattern({ cmd: 'project_update' })
  public async updateProject(params: {
    project: any;
    project_id: string;
    user_id: string;
  }): Promise<any> {
        return await this.projectService.getProjectByidAndUpdate(params);
  }

  @MessagePattern({ cmd: 'get_single_project' })
  public async getProject(params: { project_id: string }): Promise<any> {
    return await this.projectService.getsingleProjectById(params.project_id);
  }

  @MessagePattern({ cmd: 'delete_project' })
  public async deleteProject(data: any): Promise<any> {
    return await this.projectService.deleteProject(data);
  }
}
