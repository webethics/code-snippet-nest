export interface IProject extends Document {
  id?: string;
  created_by: string;
  org_id: string;
  created_timestamp: Date;
  last_updated_on: Date;
  template_id: string;
  project_name: string;
  project_label: string;
  project_status: string;
  project_metadata: any;
  active: boolean;
  public_link: boolean;
}
