export interface IProject extends Document {
  id?: any;
  created_by: string;
  project_description: string;
  last_updated_on: Date;
  project_name: string;
  project_label: string;
  project_status: string;
}
