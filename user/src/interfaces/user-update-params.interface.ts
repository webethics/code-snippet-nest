import { ObjectId } from 'mongoose';

export interface IUserUpdateParams {
  phone_number: string;
  rid: string;
  full_name: string;
  profile_handle: string;
  email: string;
  managed_by_org: boolean;
  org_id: string;
  avatar_url: string;
  timezone: string;
}
