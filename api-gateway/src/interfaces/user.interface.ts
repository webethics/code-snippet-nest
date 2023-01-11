import { Document } from 'mongoose';
export interface IUser extends Document {
  id?: string;
  phone_number: string;
  join_date: Date;
  first_name: string;
  is_verified: boolean;
  email: string;
}
