import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import mongoose from 'mongoose';
import {User } from './user.schema';
export type ProjectDocument = Project & Document;
@Schema()
export class Project {
  @Prop()
  slug: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by: User;
  @Prop({ type: Date })
  last_updated_on: Date;
  @Prop({ required: true })
  project_name: string;
  @Prop()
  project_label: string;
  @Prop()
  project_status: string;
  @Prop()
  project_type: string;
  @Prop()
  project_description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
