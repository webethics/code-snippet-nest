import { Date, Document, ObjectId } from 'mongoose';
export interface IUser extends Document {
  id?: string;
  phone_number: string;
  join_date: Date;
  full_name: string;
  is_verified: boolean;
  email: string;
  is_updated: boolean;
}
