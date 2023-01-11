import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument, Project } from 'src/schemas/project.schema';

@Injectable()
export class projectService {
  public constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) { }
  
  // function to create  project//
  public async createProject(project: any): Promise<any> {
    let date = new Date();
    project.created_by = project.user_id;
    project.last_updated_on = date;
    const projectModel = new this.projectModel(project);
    return await projectModel.save();
  }
  // function to get all projects//
  public async getProjects(): Promise<any> {
    return await this.projectModel.find().populate('created_by');
  }
  // function to update project//
  public async getProjectByidAndUpdate(params: any): Promise<any> {
    if (params.project_id.match(/^[0-9a-fA-F]{24}$/)) {
        let date = new Date();
      params.project.last_updated_on = date;
      return await this.projectModel.findOneAndUpdate(
        { _id: params.project_id },
        params.project,
        { new: true },
      );
    } else {
      return 'invalid_id';
    }
  }
  // function to get single project//
  public async getsingleProjectById(project_id: string): Promise<any> {
    if (project_id.match(/^[0-9a-fA-F]{24}$/)) {
      let project: any = await this.projectModel
        .findOne({
          _id: project_id,
        })
        .populate('created_by');

      if (project) {
        return project;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  // function to delete project//
  public async deleteProject(data: any): Promise<any> {
    if (data.param.project_id.match(/^[0-9a-fA-F]{24}$/)) {
      let delete_project = await this.projectModel.findOneAndDelete({
        _id: data.param.project_id,
      });
      if (delete_project) {
        return delete_project;
      } else {
        return 'invalid_id';
      }
    } else {
      return 'invalid_id';
    }
  }
}
