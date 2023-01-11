import { Document } from 'mongoose';
export interface IUser extends Document {
  id?: string;
  phone_number: string;
  uid: string;
  join_date: Date;
  rid: string;
  first_name: string;
  is_verified: boolean;
  otp: number;
  otp_createdAt: number;
}
