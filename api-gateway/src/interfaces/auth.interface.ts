import { Document } from 'mongoose';
export interface IAuth extends Document {
  token: string;
  user: IAuth[] | null;
}
